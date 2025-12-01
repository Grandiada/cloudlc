import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Trip, Booking, Flight } from 'entities';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mssql',
        host: 'travel-booking-portal-server.database.windows.net',
        port: 1433,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        username: config.get<string>('DATABASE_USER'),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        password: config.get<string>('DATABASE_PASSWORD'),
        database: 'Travel Booking Portal Database',
        entities: [User, Trip, Flight, Booking],
        synchronize: false,
        options: {
          encrypt: true, // Azure SQL
          trustServerCertificate: false,
        },
        extra: {
          options: {
            enableArithAbort: true,
          },
        },
      }),
    }),

    TypeOrmModule.forFeature([User, Trip, Flight, Booking]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
