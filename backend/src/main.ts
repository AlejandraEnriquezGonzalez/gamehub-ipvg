import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Valida automáticamente los DTO de cada petición
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina campos que no están en el DTO
      forbidNonWhitelisted: true, // responde 400 si envían campos extra
      transform: true, // convierte tipos (ej: "5" -> 5 en parámetros)
    }),
  );

  // Documentación Swagger disponible en http://localhost:3000/docs
  const config = new DocumentBuilder()
    .setTitle('GameHub IPVG API')
    .setDescription('API REST para torneos de videojuegos y eSports del IPVG')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();