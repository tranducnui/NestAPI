import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmojiService } from './emoji.service';
import { CreateEmojiDto } from './dto/create-emoji.dto';
import { UpdateEmojiDto } from './dto/update-emoji.dto';
import { Emoji } from './entities/emoji.entity';

@Controller('emoji')
export class EmojiController {
  constructor(private readonly emojiService: EmojiService) {}

  @Post('createEmoji')
  createEmoji(@Body() createEmojiDto: CreateEmojiDto) {
    return this.emojiService.createEmoji(createEmojiDto);
  }

  @Get()
  findAllEmoji(): Promise<Emoji[]> {
    return this.emojiService.getAllEmoji();
  }

  @Get(':id')
  findOneEmoji(@Param('id') id: number): Promise<Emoji> {
    return this.emojiService.getEmojiById(id);
  }

  @Patch(':id')
  updateEmoji(@Param('id') id: number, @Body() updateEmojiDto: UpdateEmojiDto):Promise<Emoji> {
    return this.emojiService.updateEmoji(id, updateEmojiDto);
  }

  @Delete(':id')
  removeEmoji(@Param('id') id: number):Promise<void> {
    return this.emojiService.removeEmoji(id);
  }



  // @Get(':emoji_id/statuses')
  // async getEmojiStatuses(@Param('emoji_id') emoji_id: number) {
  //   return this.emojiService.getEmojiStatuses(emoji_id);
  // }

  // @Post(':emoji_id/statuses/:status_id')
  // async linkStatusToEmoji(
  //   @Param('emoji_id') emoji_id: number,
  //   @Param('status_id') status_id: number,
  // ) {
  //   return this.emojiService.linkStatusToEmoji(emoji_id, status_id);
  // }

  // @Delete(':emoji_id/statuses/:status_id')
  // async unlinkStatusFromEmoji(
  //   @Param('emoji_id') emoji_id: number,
  //   @Param('status_id') status_id: number,
  // ) {
  //   return this.emojiService.unlinkStatusFromEmoji(emoji_id, status_id);
  // }

}
