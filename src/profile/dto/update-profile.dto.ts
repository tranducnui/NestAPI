import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-profile.dto';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateProfileDto  {

    @IsString()
    @IsOptional()
    first_name?:string

    @IsString()
    @IsOptional()
    last_name?:string

    @IsString()
    @IsOptional()
    age?:number

    @IsNumber()
    @IsOptional()
    address?:string

    @IsString()
    @IsOptional()
    occupation?:string
}
