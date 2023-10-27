import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post(':user_id')
  async create(
    @Param('user_id') user_id: number,
    @Body() createProfileDto: CreateProfileDto
    ):Promise<Profile> {
    return this.profileService.createProfile(user_id,createProfileDto);
  }

  @Get()
  async findAll(): Promise<Profile[]> {
    return this.profileService.findAllProfiles();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Profile> {
    return this.profileService.findOneProfile(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.updateProfile(id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.profileService.removeProfile(id);
  }
}
