import { PartialType } from '@nestjs/mapped-types';
import { CreateFlightDto } from './create-flight.dto';
import {IsDate, IsNumber, IsOptional} from "class-validator";

export class UpdateFlightDto extends PartialType(CreateFlightDto) {
  @IsNumber()
  @IsOptional()
  id: number;
  @IsNumber()
  @IsOptional()
  companyId: number;

  @IsNumber()
  @IsOptional()
  departureAirport: number;

  @IsNumber()
  @IsOptional()
  arrivalAirport: number;

  @IsDate()
  @IsOptional()
  departureDate: Date;

  @IsDate()
  @IsOptional()
  arrivalDate: Date;

  @IsDate()
  @IsOptional()
  departureHour: Date;

  @IsDate()
  @IsOptional()
  arrivalHour: Date;

  @IsDate()
  @IsOptional()
  deleted: Date;
}
