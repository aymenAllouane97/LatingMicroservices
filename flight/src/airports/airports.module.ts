import {Module} from '@nestjs/common';
import {AirportsService} from './airports.service';
import {AirportsController} from './airports.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Airport} from "./entities/airport.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Airport])]
    ,
    controllers: [AirportsController],
    providers: [AirportsService],
})
export class AirportsModule {
}
