import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateStatusDto {

    @IsString()
    @IsNotEmpty()
    title: string;
  
    @IsString()
    @IsOptional()
    description?: string;
  
    @IsString()
    @IsNotEmpty()
    link: string;

}
