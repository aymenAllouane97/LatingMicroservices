import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ClientProxyFactory, ClientsModule, Transport} from "@nestjs/microservices";
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';
import { CitiesModule } from './cities/cities.module';
import { AirportsModule } from './airports/airports.module';
import { FlightsModule } from './flights/flights.module';

@Module({
  imports: [ClientsModule.register([
    { name: 'AUTH_SERVICE', transport: Transport.TCP },
    { name: 'FLIGHT_SERVICE', transport: Transport.TCP }
  ]), AuthModule, CompaniesModule, CitiesModule, AirportsModule, FlightsModule
  ],
  controllers: [AppController],
  providers: [AppService,

],
})
export class AppModule {}
