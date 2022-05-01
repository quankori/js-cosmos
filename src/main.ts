import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './configs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  await app.listen(config.envServer.port);
}
bootstrap();
