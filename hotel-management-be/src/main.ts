import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        const formattedErrors = {};

        errors.forEach((err) => {
          if (err.constraints) {
            const field = err.property;
            const message = Object.values(err.constraints)[0];
            formattedErrors[field] = message;
          }
        });

        return new BadRequestException({
          errors: formattedErrors,
        });
      },
    }),
  );

  await app.listen(3001);
}
bootstrap();
