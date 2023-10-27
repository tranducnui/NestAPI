import { Statuses_Emojis } from 'src/statuses_emojis/entities/statuses_emojis.entity';
import { Emoji } from 'src/emoji/entities/emoji.entity';
import { Injectable, NotFoundException, UseFilters, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { get } from 'http';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Transaction } from 'typeorm';
import { use } from 'passport';
import { Profile } from '../profile/entities/profile.entity';
import { StatusService } from 'src/status/status.service';
import { Status } from 'src/status/entities/status.entity';
import { ProfileService } from 'src/profile/profile.service';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Statuses_Emojis)
    private statuses_emojisRepository: Repository<Statuses_Emojis>,
    @InjectRepository(Emoji)
    private emojiRepository: Repository<Emoji>,
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @Inject(StatusService) private readonly statusService: StatusService,
    @Inject(ProfileService) private readonly profileService: ProfileService
  ) { }


  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find()
  }



  async getUserById(id: number): Promise<User> {

    const user = await this.userRepository.findOne({ where: { id } })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user;
  }



  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundException('User not found')
    }
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }


  // @Transactional()
  async deleteUser(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundException('User not found')
    }

    const profile = await this.profileRepository.findOne({ where: { user: { id } } })
    const emojiStatus = await this.statuses_emojisRepository.find({ where: { status_id: id } })
    const status = await this.statusRepository.find({ where: { user: { id } } });

    // profile.deleted_at = new Date
    // await this.profileRepository.save(profile)

    for (const emoji_status of emojiStatus) {
      // emoji_status.deleted_at = new Date
      // await this.statuses_emojisRepository.save(emoji_status)
      await this.statuses_emojisRepository.remove(emojiStatus)

    }

    for (const status_id of status) {
      // status_id.deleted_at = new Date
      // await this.statusRepository.save(status_id)
      await this.statusRepository.remove(status);

    }

    // user.deleted_at = new Date
    // await this.userRepository.save(user)

    // await this.profileRepository.remove(profile)
    await this.userRepository.remove(user)

  }

}
