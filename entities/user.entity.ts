import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Trip } from './trip.entity';

@Entity({ name: 'User' }) // имя таблицы в БД
export class User {
  @PrimaryGeneratedColumn({ name: 'UserId' })
  userId: number;

  @Column({ name: 'UserName', type: 'nvarchar', length: 255 })
  userName: string;

  @OneToMany(() => Trip, (trip) => trip.user)
  trips: Trip[];
}
