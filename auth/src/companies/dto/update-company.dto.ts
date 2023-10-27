import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyDto } from './create-company.dto';
import {IsEmail, IsOptional, IsString} from "class-validator";

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
  @IsOptional()
  id: number;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;
}
