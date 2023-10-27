import { Statuses_Emojis } from 'src/statuses_emojis/entities/statuses_emojis.entity';
import { ConflictException, Inject, Injectable, NotFoundException, Delete } from '@nestjs/common';
import { CreateEmojiDto } from './dto/create-emoji.dto';
import { UpdateEmojiDto } from './dto/update-emoji.dto';
import {  InjectRepository, getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository, Transaction } from 'typeorm';
import { Emoji } from './entities/emoji.entity';
import { Status } from '../status/entities/status.entity';
import { StatusesEmojisService } from '../statuses_emojis/statuses_emojis.service';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class EmojiService {
  constructor(@InjectRepository(Emoji)
  private emojiRepository: Repository<Emoji>,
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
    @InjectRepository(Statuses_Emojis)
    private statusEmojiRepository: Repository<Statuses_Emojis>,
    @Inject(Statuses_Emojis) private readonly statuses_emojisService: StatusesEmojisService,
    // private readonly entityManager: EntityManager

  ) { }

  async createEmoji(createEmojiDto: CreateEmojiDto) {
    const { name } = createEmojiDto;
    const exitEmoji = await this.emojiRepository.findOne({ where: { name } })
    if (exitEmoji) { throw new ConflictException('Emoji has been have') }
    const emoji = this.emojiRepository.create({ name })
    return this.emojiRepository.save(emoji)
  }

  async getAllEmoji(): Promise<Emoji[]> {
    return this.emojiRepository.find()
  }

  async getEmojiById(id: number): Promise<Emoji> {
    const emoji = await this.emojiRepository.findOne({ where: { id } })
    if (!emoji) { throw new NotFoundException('Emoji not found') }

    return emoji
  }

  async updateEmoji(id: number, updateEmojiDto: UpdateEmojiDto): Promise<Emoji> {
    const emoji = await this.emojiRepository.findOne({ where: { id } })
    if (!emoji) { throw new NotFoundException('Emoji not found') }

    Object.assign(emoji, updateEmojiDto)
    return this.emojiRepository.save(emoji)
  }

  // @Transactional()
  async removeEmoji(emoji_id: number): Promise<void> {
  
        const statusEmoji = await this.statusEmojiRepository.find({ where: { emoji_id: emoji_id } });

        const emoji = await this.emojiRepository.findOne({ where: { id: emoji_id } })
        if (!emoji) { throw new NotFoundException('Emoji not found') }
        
        for (const emojiId of statusEmoji) {
          // emojiId.deleted_at = new Date();
          // await this.statusEmojiRepository.save(emojiId)
          await this.statusEmojiRepository.remove(statusEmoji)
        }
        
        // emoji.deleted_at = new Date();
        // await this.emojiRepository.save(emoji)
        await this.emojiRepository.remove(emoji)
      }
}
