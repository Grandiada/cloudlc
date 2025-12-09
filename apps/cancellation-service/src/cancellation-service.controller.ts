import { Controller, Get } from '@nestjs/common';
import { CancellationServiceService } from './cancellation-service.service';

@Controller()
export class CancellationServiceController {
  constructor(private readonly cancellationServiceService: CancellationServiceService) {}

  @Get()
  getHello(): string {
    return this.cancellationServiceService.getHello();
  }
}
