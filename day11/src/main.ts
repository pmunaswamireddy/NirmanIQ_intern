import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3011;
  await app.listen(port);
  console.log(`[NestJS] Day 11 API Server running on http://localhost:${port}`);
}

bootstrap();
