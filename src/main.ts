import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { addTransactionalDataSource, initializeTransactionalContext, } from 'typeorm-transactional';
import dataSource, { dataSourceOptions } from 'db/data-source';
import { createConnection } from 'net';

async function bootstrap() {
  initializeTransactionalContext();
  // const connection = createConnection(dataSourceOptions);
  const app = await NestFactory.create(AppModule);
  //add middle ware
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));
  addTransactionalDataSource(dataSource)
  await app.listen(3333);
}
bootstrap();
