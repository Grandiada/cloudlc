import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'entities';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,
  ) {}

  async getHello(): Promise<string> {
    const bookings = await this.bookingRepo.find({
      relations: ['trip', 'flight', 'trip.user'],
    });

    return JSON.stringify(bookings);
  }
}
