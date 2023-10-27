import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateStatus_EmojiDto {


  
    @IsString()
    @IsNotEmpty()
    status_id: number;
  
    @IsString()
    @IsNotEmpty()
    emoji_id: number;

}
