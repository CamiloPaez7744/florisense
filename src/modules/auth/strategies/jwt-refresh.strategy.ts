import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly configService: ConfigService,
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
  ) {
    const accessSecret = configService.get<string>('jwt.accessSecret');
    if (!accessSecret) {
      throw new Error(
        'JWT access secret is not defined in environment variables',
      );
    }

    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: accessSecret,
      passReqToCallback: true,
    });
  }

  async validate(req: any, payload: any) {
    const token = req.body.refreshToken;
    const stored = await this.redis.get(`refresh:${payload.sub}`);

    if (!stored || stored !== token) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    return { userId: payload.sub, email: payload.email };
  }
}
