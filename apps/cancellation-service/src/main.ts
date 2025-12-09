import { NestFactory } from '@nestjs/core';
import { CancellationServiceModule } from './cancellation-service.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(CancellationServiceModule);

  const config = new DocumentBuilder()
    .setTitle('Cancellation Service API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // Swagger будет по /docs

  await app.listen(process.env.port ?? 3001);
}

bootstrap();
