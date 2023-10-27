import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, In, Repository } from "typeorm";
import { Statuses_Emojis } from "./entities/statuses_emojis.entity";
import { EmojiService } from "src/emoji";
import { Status } from '../status/entities/status.entity';
import { Emoji } from "src/emoji/entities/emoji.entity";
import { UpdateStatus_EmojiDto } from "./dto";
import { CreateStatus_EmojiDto } from './dto/create-status_emoji.dto';
import { StatusService } from "src/status/status.service";

@Injectable()
export  class  StatusesEmojisService {
    constructor(
        @InjectRepository(Statuses_Emojis)
        private statuses_emojisRepository: Repository<Statuses_Emojis>,
        @InjectRepository(Emoji)
        private emojiRepository: Repository<Emoji>,
        @InjectRepository(Status)
        private statusRepository: Repository<Status>,
        @Inject(Status) private readonly statusService: StatusService,
        @Inject(Status) private readonly emojiService: EmojiService,

    ) { }

    async getEmojiFromStatus(emoji_id: number):Promise<Statuses_Emojis[]>{
        const emoji = await this.statuses_emojisRepository.find({ where: { emoji_id} })
        if (emoji.length==0) {
            throw new NotFoundException('Emoji_id not found');
        }
        return emoji
    }

    async getAllStatuses_Emojis(): Promise<Statuses_Emojis[]> {
        return this.statuses_emojisRepository.find();
    }

    async addEmojiToStatus(createStatus_EmojiDto: CreateStatus_EmojiDto): Promise<Statuses_Emojis> {
        const { status_id, emoji_id } = createStatus_EmojiDto
        
        // const find_status_id = await this.statusRepository.findOne({where:{id:status_id}})
        // const find_emoji_id = await this.statusRepository.findOne({where:{id:emoji_id}})
        

        const link = this.statuses_emojisRepository.create({...createStatus_EmojiDto })
        return this.statuses_emojisRepository.save(link)

    }

    async updateEmoji_of_Status(id:number, updateStatus_EmojiDto: UpdateStatus_EmojiDto): Promise<Statuses_Emojis> {
        const status_emoji = await this.statuses_emojisRepository.findOne({ where: { id: id } });

        if (!status_emoji) {
            throw new NotFoundException('Status_emoji not found');
        }

        Object.assign(status_emoji, updateStatus_EmojiDto);
        // status_emoji.status_id = updateStatus_EmojiDto.status_id;
        // status_emoji.emoji_id = updateStatus_EmojiDto.emoji_id;
        return this.statuses_emojisRepository.save(status_emoji);
    }

    async removeEmoji_out_of_Status(status_id:number,emoji_id: number): Promise<void> {

        const statusEmoji = await this.statuses_emojisRepository.findOne({ where: { status_id:status_id, emoji_id:emoji_id } });
        if (!statusEmoji) {
            throw new NotFoundException('Emoji of Status not found');
        }
        // await this.statuses_emojisRepository.remove(statusEmoji)
        statusEmoji.deleted_at = new Date()
        await this.statuses_emojisRepository.save(statusEmoji)
    }

    async removeEmoji_Status(emoji_id: number): Promise<void> {

        const statusEmoji = await this.statuses_emojisRepository.findOne({ where: { emoji_id } });
        if (!statusEmoji) {
            throw new NotFoundException('Status Emoji not found');
        }
        // await this.statuses_emojisRepository.remove(statusEmoji)
        statusEmoji.deleted_at = new Date()
        await this.statuses_emojisRepository.save(statusEmoji)
    }

    async removeStatus_Emoji(status_id: number): Promise<void> {

        const emojiStatus = await this.statuses_emojisRepository.findOne({ where: {status_id } })
        if (!emojiStatus) {
            throw new NotFoundException('Status Emoji not found');
        }

        await this.statuses_emojisRepository.remove(emojiStatus)
        // emojiStatus.deleted_at = new Date()
        // await this.statuses_emojisRepository.save(emojiStatus)

    }





}