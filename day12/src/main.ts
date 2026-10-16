import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );
  app.enableCors({ origin: '*' });
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(3012);
  console.log('Day 12 NestJS API running on http://localhost:3012');
  return app;
}

if (require.main === module) {
  bootstrap();
}
