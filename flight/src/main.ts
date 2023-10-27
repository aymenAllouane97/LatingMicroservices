import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import * as dotenv from 'dotenv';

async function bootstrap() {
    dotenv.config()
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      {
          options:{
          host:'localhost',
              port:3002
          },
        transport: Transport.TCP,
      },
  );
  await app.listen().then(()=>{
      console.log('flight service started on ')
  });
}

bootstrap();
