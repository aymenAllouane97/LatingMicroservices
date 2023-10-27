import { PartialType } from '@nestjs/mapped-types';
import { CreateCityDto } from './create-city.dto';
import {IsNumber, IsOptional, IsString} from "class-validator";

export class UpdateCityDto extends PartialType(CreateCityDto) {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  name: string;

}
