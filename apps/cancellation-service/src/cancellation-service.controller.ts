import { Body, Controller, Get, Post } from '@nestjs/common';
import { CancellationServiceService } from './cancellation-service.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { ApiProperty } from '@nestjs/swagger';

export class CancelBookingDto {
  @ApiProperty({
    example: '123',
    description: 'Order ID',
  })
  orderId: string;
}

@Controller()
export class CancellationServiceController {
  constructor(
    private readonly cancellationServiceService: CancellationServiceService,
  ) {}

  @Get('healthcheck')
  @ApiOperation({ summary: 'Healthcheck endpoint' })
  @ApiResponse({ status: 200, description: 'Healthcheck endpoint' })
  healthCheck(): string {
    return 'OK';
  }

  @Post('cancel-booking')
  @ApiOperation({ summary: 'Cancel booking endpoint' })
  @ApiResponse({ status: 200, description: 'Cancel booking endpoint' })
  async sendMessage(
    @Body() body: CancelBookingDto,
  ): Promise<{ message: string }> {
    await this.cancellationServiceService.sendMessage(body.orderId);
    return { message: 'Message sent' };
  }
}
