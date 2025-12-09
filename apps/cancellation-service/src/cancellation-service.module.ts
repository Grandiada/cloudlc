import { Module } from '@nestjs/common';
import { CancellationServiceController } from './cancellation-service.controller';
import { CancellationServiceService } from './cancellation-service.service';

@Module({
  imports: [],
  controllers: [CancellationServiceController],
  providers: [CancellationServiceService],
})
export class CancellationServiceModule {}
