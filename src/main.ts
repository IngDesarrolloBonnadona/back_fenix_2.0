import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,  // Elimina propiedades no deseadas automáticamente
      forbidNonWhitelisted: true, // Lanza un error si se reciben propiedades no deseadas
      transform: true // Transforma los objetos a sus tipos esperados
    })
  )

  const config = new DocumentBuilder()
    .setTitle('FENIX 2.0')
    .setDescription('The FENIX API description')
    .setVersion('2.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors()

  const port = +process.env.TYPEORM_PORT_RUN || 10000
  await app.listen(port);
  logger.log(`The aplication is running on port: ${port || 10000}`)
}

bootstrap();
