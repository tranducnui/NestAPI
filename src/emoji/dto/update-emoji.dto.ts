import { PartialType } from '@nestjs/mapped-types';
import { CreateEmojiDto } from './create-emoji.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateEmojiDto  {

    @IsString()
    @IsOptional()
    name?:String

}
