import { AuthDto } from 'src/auth/dto';
import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(AuthDto) {}
