import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { AppConfig } from '@app-types';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbRaw = configService.get('redis');

        if (!dbRaw) {
          throw new Error('Missing database configuration');
        }

        const redis = dbRaw as AppConfig['redis'];

        const client = new Redis({
          host: redis.host,
          port: redis.port,
          password: redis.password,
          tls: redis.tls ? {} : undefined,
        });

        client.on('connect', () => console.log('✅ Redis connected'));
        client.on('error', (err) => console.error('❌ Redis error:', err));

        return client;
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
