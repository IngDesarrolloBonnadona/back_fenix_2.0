import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  const port = +process.env.TYPEORM_PORT_RUN || 10000
  await app.listen(port);
  logger.log(`The aplication is running on port: ${port || 10000}`)
}
bootstrap();
