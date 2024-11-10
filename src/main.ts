import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.setGlobalPrefix('/api/v1');
  const swaggerConf = new DocumentBuilder()
    .setTitle('Company & Market API')
    .setDescription('API to manage and retrieve company and market data')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConf);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
