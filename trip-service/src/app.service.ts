import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'entities';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async getHello(): Promise<string> {
    const users = await this.userRepo.find({
      relations: ['trips', 'trips.bookings', 'trips.bookings.flight'],
    });

    return JSON.stringify(users);
  }
}
