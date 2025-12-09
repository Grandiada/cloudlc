import { Injectable } from '@nestjs/common';

@Injectable()
export class CancellationServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
