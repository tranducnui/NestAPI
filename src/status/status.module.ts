import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from './entities/status.entity';
import { Emoji } from 'src/emoji/entities/emoji.entity';
import { EmojiService } from 'src/emoji';
import { Statuses_Emojis } from 'src/statuses_emojis/entities/statuses_emojis.entity';
import { StatusesEmojisService } from 'src/statuses_emojis/statuses_emojis.service';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Status,Statuses_Emojis,Emoji,User]),
    ],
  controllers: [StatusController],
  providers: [StatusService,StatusesEmojisService,Statuses_Emojis,EmojiService,Status],
})
export class StatusModule {}
