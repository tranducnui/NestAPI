import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from "@nestjs/common";
import { StatusesEmojisService } from "./statuses_emojis.service";
import { NotFoundError } from "rxjs";
import { Statuses_Emojis } from "./entities/statuses_emojis.entity";
import { CreateStatus_EmojiDto, UpdateStatus_EmojiDto } from "./dto";

@Controller('statuses_emojis')
export class StatusesEmojisController {
    constructor(private readonly statuses_emojisService: StatusesEmojisService,) { }


    @Get(':emoji_id')
    async getStatusEmojis(@Param('emoji_id') emoji_id: number,):Promise<Statuses_Emojis[]> {
        return this.statuses_emojisService.getEmojiFromStatus(emoji_id)
    }

    @Get()
    async getAllStatuses_Emojis(): Promise<Statuses_Emojis[]> {
        return this.statuses_emojisService.getAllStatuses_Emojis();
    }

    @Post('add')
    addEmojiToStatus(
        @Body() createStatus_EmojiDto: CreateStatus_EmojiDto
    ) {
        try {
            this.statuses_emojisService.addEmojiToStatus(createStatus_EmojiDto)
        }
        catch (error) {
            throw new NotFoundException('Can not add emoji to status')
        }
    }

    @Patch(':id/emojis')
    updateStatus_Emojis(
        @Param('id') id: number,
        @Body() updateStatus_EmojiDto: UpdateStatus_EmojiDto): Promise<Statuses_Emojis> {
        return this.statuses_emojisService.updateEmoji_of_Status(id, updateStatus_EmojiDto);
    }

    @Delete(':status_id/emojis/:emoji_id')
    removeEmoji_out_of_Status(
        @Param('status_id') status_id: number,
        @Param('emoji_id') emoji_id: number,) {
        this.statuses_emojisService.removeEmoji_out_of_Status(status_id,emoji_id);
    }

    @Delete('emojis/:emoji_id')
    removeEmojiFromStatus(
        @Param('emoji_id') emoji_id: number,
    ) {
        try {
            this.statuses_emojisService.removeEmoji_Status(emoji_id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            }
            throw error;
        }
    }

    @Delete('status/:status_id')
    removeStatus_Emoji(
        @Param('status_id') status_id: number,
    ) {
        try {
            this.statuses_emojisService.removeStatus_Emoji(status_id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            }
            throw error;
        }
    }


}


