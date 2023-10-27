import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { StatusModule } from 'src/status/status.module';
import { ProfileModule } from 'src/profile/profile.module';
import { Status } from 'src/status/entities/status.entity';
import { StatusService } from 'src/status/status.service';
import { ProfileService } from 'src/profile/profile.service';
import { Emoji } from 'src/emoji/entities/emoji.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { Statuses_Emojis } from 'src/statuses_emojis/entities/statuses_emojis.entity';
import { StatusesEmojisService } from 'src/statuses_emojis/statuses_emojis.service';
import { EmojiService } from 'src/emoji';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Status, Profile, Statuses_Emojis,Emoji]),
  
  ],
  controllers: [UserController],

  providers: [
    UserService,
    StatusService,
    EmojiService,
    ProfileService,
    StatusesEmojisService,
    Statuses_Emojis,
    Status,Emoji],
})
export class UserModule { }
