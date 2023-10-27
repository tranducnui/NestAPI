import { IsNotEmpty, IsNumber, IsOptional, IsString, isString } from "class-validator"

export class CreateProfileDto {

    @IsString()
    @IsNotEmpty()
    first_name:string

    @IsNotEmpty()
    @IsString()
    last_name:string

    @IsString()
    @IsNotEmpty()
    age:number

    @IsString()
    @IsNotEmpty()
    address:string

    @IsString()
    @IsOptional()
    occupation?:string
}
