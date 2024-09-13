import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  //app.use(cors({
  //  origin: '*', // Replace with your frontend URL
  //  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //  credentials: true,
  //  allowedHeaders: 'Content-Type, Authorization',
  //}));
  //
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // false by default, removes unspecified params
      transform: true, // enable partial DTO
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(3001);
}
bootstrap();
