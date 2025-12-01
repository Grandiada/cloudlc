import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Trip } from './trip.entity';
import { Flight } from './flight.entity';

@Entity({ name: 'Booking' })
export class Booking {
  @PrimaryGeneratedColumn({ name: 'BookingId' })
  bookingId: number;

  @ManyToOne(() => Trip, (trip) => trip.bookings)
  @JoinColumn({ name: 'TripId' }) // FK колонка в Booking
  trip: Trip;

  @ManyToOne(() => Flight, (flight) => flight.bookings)
  @JoinColumn({ name: 'FlightId' }) // FK колонка в Booking, а не flightFlightId
  flight: Flight;

  @Column({ name: 'Status', type: 'nvarchar', length: 32 })
  status: string;

  @Column({ name: 'StatusUpdatedAt', type: 'datetime2' })
  statusUpdatedAt: Date;

  @Column({ name: 'BookedSeats', type: 'int' })
  bookedSeats: number;
}
