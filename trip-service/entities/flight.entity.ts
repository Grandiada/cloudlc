import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Booking } from './booking.entity';

@Entity({ name: 'Flight' })
export class Flight {
  @PrimaryGeneratedColumn({ name: 'FlightId' })
  flightId: number;

  @Column({ name: 'DepartureAirport', type: 'nvarchar', length: 64 })
  departureAirport: string;

  @Column({ name: 'ArrivalAirport', type: 'nvarchar', length: 64 })
  arrivalAirport: string;

  @Column({ name: 'DepartureTime', type: 'datetime2' })
  departureTime: Date;

  @Column({ name: 'ArrivalTime', type: 'datetime2' })
  arrivalTime: Date;

  @Column({
    name: 'AirplaneModelName',
    type: 'nvarchar',
    length: 128,
    nullable: true,
  })
  airplaneModelName: string | null;

  @Column({ name: 'Status', type: 'nvarchar', length: 32 })
  status: string;

  @Column({ name: 'SeatsTotal', type: 'int' })
  seatsTotal: number;

  @Column({ name: 'SeatsBooked', type: 'int', default: 0 })
  seatsBooked: number;

  @OneToMany(() => Booking, (booking) => booking.flight)
  bookings: Booking[];
}
