import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from './entities/status.entity';
import { EmojiService } from '../emoji/emoji.service';
import { Emoji } from 'src/emoji/entities/emoji.entity';
import { Statuses_Emojis } from 'src/statuses_emojis/entities/statuses_emojis.entity';
import { StatusesEmojisService } from '../statuses_emojis/statuses_emojis.service';
import { User } from 'src/user/entities/user.entity';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class StatusService {
  constructor(@InjectRepository(Status,)
  private statusRepository: Repository<Status>,
    @InjectRepository(Emoji)
    private emojiRepository: Repository<Emoji>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Statuses_Emojis)
    private statusEmojiRepository: Repository<Statuses_Emojis>,
    @Inject(Statuses_Emojis) private readonly statuses_emojisService: StatusesEmojisService,

  ) { }

  async createStatus(user_id: number, createStatusDto: CreateStatusDto): Promise<Status> {

    const findUser = await this.userRepository.findOne({ where: { id: user_id } })
    if (!findUser) { throw new NotFoundException('Can not found User') }

    const status = this.statusRepository.create({ user: { id: user_id }, ...createStatusDto });
    return this.statusRepository.save(status);
  }

  async getAllStatuses(): Promise<Status[]> {
    return this.statusRepository.find();
  }

  async getStatusByUserId(user_id: number): Promise<Status[]> {
    const status = await this.statusRepository.find({ where: { user: { id: user_id } } });

    if (!status) {
      throw new NotFoundException('Status not found');
    }

    return status;
  }

  async getStatusById(id: number): Promise<Status> {
    const status = await this.statusRepository.findOne({ where: { id } });

    if (!status) {
      throw new NotFoundException('Status not found');
    }

    return status;
  }

  async updateStatus(id: number, updateStatusDto: UpdateStatusDto): Promise<Status> {
    const status = await this.statusRepository.findOne({ where: { id } });

    if (!status) {
      throw new NotFoundException('Status not found');
    }

    Object.assign(status, updateStatusDto);
    return this.statusRepository.save(status);
  }

  // @Transactional()
  async deleteStatus(status_id: number,): Promise<void> {

    const status = await this.statusRepository.findOne({ where: { id: status_id } });
    if (!status) { throw new NotFoundException('Status not found'); }

    const emojiStatus = await this.statusEmojiRepository.find({ where: { status_id } })

    for (const status_id of emojiStatus) {
      // status_id.deleted_at = new Date();
      // this.statusEmojiRepository.save(status_id)

      await this.statusEmojiRepository.remove(emojiStatus)
    }

    // status.deleted_at = new Date()
    // this.statusRepository.save(status)

    await this.statusRepository.remove(status)

  }

}
