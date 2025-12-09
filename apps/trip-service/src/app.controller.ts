import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<any> {
    const data = await this.appService.getHello();
    try {
      return JSON.parse(data);
    } catch {
      return { data };
    }
  }
}
