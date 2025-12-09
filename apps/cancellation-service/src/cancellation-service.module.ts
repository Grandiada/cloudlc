import { Module } from '@nestjs/common';
import { CancellationServiceController } from './cancellation-service.controller';
import { CancellationServiceService } from './cancellation-service.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [CancellationServiceController],
  providers: [CancellationServiceService],
})
export class CancellationServiceModule {}
