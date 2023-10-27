import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateStatus_EmojiDto  {
  
    @IsString()
    @IsOptional()
    emoji_id?: number;
}
