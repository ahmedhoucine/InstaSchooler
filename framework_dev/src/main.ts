import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json({ limit: '10mb' }));  // Adjust '10mb' to a higher value if necessary

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
