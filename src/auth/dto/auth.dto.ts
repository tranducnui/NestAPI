import { IsEmail, IsNotEmpty, IsString, MinLength, minLength } from "class-validator";

export class AuthDto{
    @IsEmail()
    @IsNotEmpty()
    email: string;


    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    password: string;
}