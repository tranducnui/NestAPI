import { Module } from '@nestjs/common';
import { EmojiService } from './emoji.service';
import { EmojiController } from './emoji.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Emoji } from './entities/emoji.entity';
import { Statuses_Emojis } from 'src/statuses_emojis/entities/statuses_emojis.entity';
import { StatusesEmojisService } from '../statuses_emojis/statuses_emojis.service';
import { Status } from 'src/status/entities/status.entity';
import { StatusService } from 'src/status/status.service';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Emoji,Statuses_Emojis,Status,User])],
  controllers: [EmojiController],
  providers: [EmojiService, StatusesEmojisService,StatusService,Statuses_Emojis,Status],
})
export class EmojiModule {}
