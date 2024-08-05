import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({ origin: '*' });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // false by default, removes unspecified params
    transform: true, // enable partial DTO
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));

  await app.listen(3000);
}
bootstrap();
