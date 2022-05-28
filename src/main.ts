import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './core/exception';

async function server() {

  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.setGlobalPrefix('v1', {
    exclude: ['/']
  })

  ///Global Config
  app.useGlobalFilters(new AllExceptionsFilter())
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  await app.listen(5000);



}
server();
