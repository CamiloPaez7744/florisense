import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    const user = this.userRepo.create(userData);
    return this.userRepo.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepo.findOne({ where: { email } });
    return user ?? undefined;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.userRepo.findOne({ where: { id } });
    return user ?? undefined;
  }
}
