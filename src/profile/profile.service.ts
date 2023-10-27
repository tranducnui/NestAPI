import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { promises } from 'dns';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @InjectRepository(User)
    private userRepository: Repository<User>) { }

  async createProfile(user_id: number, createProfileDto: CreateProfileDto) {
    const existingProfile = await this.profileRepository.findOne({ where: { user: { id: user_id } } });
    if (existingProfile) {
      throw new ConflictException('Profile already exists');
    }
    const user = await this.userRepository.findOne({where:{id: user_id}})
    if(!user) { throw new NotFoundException('Can not find User')}
    
    const profile =  this.profileRepository.create({ user: { id: user_id }, ...createProfileDto })
    return this.profileRepository.save(profile);
  }

  async findAllProfiles(): Promise<Profile[]> {
    return this.profileRepository.find()
  }

  async findOneProfile(id: number): Promise<Profile> {
    const profile = await this.profileRepository.findOne({ where: { id } })
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return profile;
  }

  async updateProfile(id: number, updateProfileDto: UpdateProfileDto) {
    const profile = await this.profileRepository.findOne({ where: { id } })
    if (!profile) {
      throw new NotFoundException('Profile not found')
    }
    Object.assign(profile, updateProfileDto)
    return this.profileRepository.save(profile)
  }

  async removeProfile(id: number): Promise<void> {
    const profile = await this.profileRepository.findOne({ where: { id } })
    if (!profile) {
      throw new NotFoundException('Profile not found')
    }

    await this.profileRepository.remove(profile)
    // profile.deleted_at = new Date()
    // await this.profileRepository.save(profile)
  }
}
