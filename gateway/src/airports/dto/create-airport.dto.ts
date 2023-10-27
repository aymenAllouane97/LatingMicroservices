import {IsNumber, IsString} from "class-validator";

export class CreateAirportDto {
    @IsString()
    name: string;

    @IsNumber()
    cityId: number;
}
