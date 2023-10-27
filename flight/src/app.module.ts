import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { CitiesModule } from './cities/cities.module';
import { AirportsModule } from './airports/airports.module';
import { FlightsModule } from './flights/flights.module';

@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_DATABASE || 'flight_service',
    entities: ["dist/src/**/**/*.entity{.ts,.js}"],
    synchronize: true,
    autoLoadEntities: true,
  }), CitiesModule, AirportsModule, FlightsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
