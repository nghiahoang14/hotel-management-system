import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      // dev
      'https://hotelmanagement-fe.kindglacier-ca6cc0f5.southeastasia.azurecontainerapps.io',
      // prod
      'https://hotel-management-fe-prod.jollysmoke-2eebac9d.southeastasia.azurecontainerapps.io',
    ],
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
  const port = process.env.PORT || 3001;

  await app.listen(port, '0.0.0.0');
}
bootstrap();
