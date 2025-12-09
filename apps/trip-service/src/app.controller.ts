import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('healthcheck')
  @ApiOperation({ summary: 'Healthcheck endpoint' })
  @ApiResponse({ status: 200, description: 'Healthcheck endpoint' })
  healthCheck(): string {
    return 'OK';
  }

  @Get()
  @ApiOperation({ summary: 'Get database records endpoint' })
  @ApiResponse({ status: 200, description: 'Get database records endpoint' })
  async getDatabaseRecords(): Promise<any> {
    const data = await this.appService.getUsersWithTrips();
    try {
      return JSON.parse(data);
    } catch {
      return { data };
    }
  }
}
