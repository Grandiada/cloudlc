import { NestFactory } from '@nestjs/core';
import { CancellationServiceModule } from './cancellation-service.module';

async function bootstrap() {
  const app = await NestFactory.create(CancellationServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
