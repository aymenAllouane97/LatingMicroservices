import {IsDate, IsNumber, IsOptional} from "class-validator";

export class CreateFlightDto {
    @IsNumber()
    companyId: number;

    @IsNumber()
    departureAirport: number;

    @IsNumber()
    arrivalAirport: number;

    @IsDate()
    departureDate: Date;

    @IsDate()
    arrivalDate: Date;

    @IsDate()
    departureHour: Date;

    @IsDate()
    arrivalHour: Date;

    @IsOptional()
    @IsDate()
    deleted: Date;
}
