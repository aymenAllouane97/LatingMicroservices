import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';
import {IsEmail, IsNumber, IsOptional, IsString} from 'class-validator';

export class UpdateClientDto extends PartialType(CreateClientDto) {
  @IsNumber()
  id:number;

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
