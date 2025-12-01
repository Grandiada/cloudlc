import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Booking } from './booking.entity';

@Entity({ name: 'Trip' })
export class Trip {
  @PrimaryGeneratedColumn({ name: 'TripId' })
  tripId: number;

  @Column({ name: 'Name', type: 'nvarchar', length: 255 })
  name: string;

  @ManyToOne(() => User, (user) => user.trips)
  @JoinColumn({ name: 'UserId' }) // FK колонка в таблице Trip
  user: User;

  @OneToMany(() => Booking, (booking) => booking.trip)
  bookings: Booking[];
}
