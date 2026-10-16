import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  app.enableCors({ origin: '*' });
  const port = process.env.PORT || 3014;
  await app.listen(port);
  console.log(`[NestJS] Day 14 Auth & Guards API running on http://localhost:${port}`);
  return app;
}

if (require.main === module) {
  bootstrap();
}
