import { PartialType } from '@nestjs/mapped-types';
import { CreateAirportDto } from './create-airport.dto';
import {IsNumber, IsOptional, IsString} from "class-validator";

export class UpdateAirportDto extends PartialType(CreateAirportDto) {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  cityId: number;
}
