import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  const port = +process.env.TYPEORM_PORT_RUN
  await app.listen(port);
  logger.log(`The aplication is runnin on port: ${port || 3001}`)
}
bootstrap();
