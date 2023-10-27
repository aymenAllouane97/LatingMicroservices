import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CompaniesModule } from './companies/companies.module';

@Module({
  imports: [ClientsModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_DATABASE || 'auth_service',
    entities: ["dist/src/**/**/*.entity{.ts,.js}"],
    synchronize: true,
    autoLoadEntities: true,
  }), CompaniesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
