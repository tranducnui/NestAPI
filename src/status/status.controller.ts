import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { Status } from './entities/status.entity';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}


  @Post(':user_id')
  async createStatus(
    @Param('user_id') user_id: number,
    @Body() createStatusDto: CreateStatusDto,
  ): Promise<Status> {
    return this.statusService.createStatus(user_id, createStatusDto);
  }

  @Get()
  async getAllStatuses(): Promise<Status[]> {
    return this.statusService.getAllStatuses();
  }
  
  @Get('user/:id')
  getStatusByUserId(@Param('id') id: number): Promise<Status[]> {
    return this.statusService.getStatusByUserId(id);
  }

  @Get(':id')
  getStatusById(@Param('id') id: number): Promise<Status> {
    return this.statusService.getStatusById(id);
  }
  
  
  @Patch(':id')
  updateStatus(@Param('id') id: number, @Body() updateStatusDto: UpdateStatusDto): Promise<Status> {
    return this.statusService.updateStatus(id, updateStatusDto);
  }
  
  @Delete(':id')
  deleteStatus(@Param('id') id: number): Promise<void> {
    return this.statusService.deleteStatus(id);
  }

  // @Get(':status_id/emojis')
  // async getStatusEmojis(
  //   @Param('status_id') status_id: number
  // ){
  //   return await this.statusService.getStatusEmojis(status_id)
  // }

//   @Post(':status_id/emoji/:emoji_id')
//   async linkEmojiToStatus(
//     @Param('status_id') status_id: number,
//     @Param('emoji_id') emoji_id: number
//   )
//   {
//     return this.statusService.linkEmojiToStatus(status_id, emoji_id)
//   }

//   @Delete(':status_id/emojis/:emoji_id')
//   async unlinkEmojiFromStatus(
//     @Param('status_id') status_id: number,
//     @Param('emoji_id') emoji_id: number,
//   ){
//     return this.statusService.unlinkEmojiFromStatus(status_id, emoji_id)
//   }
}
