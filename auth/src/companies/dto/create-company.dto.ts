import {IsEmail, IsString} from "class-validator";

export class CreateCompanyDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}
