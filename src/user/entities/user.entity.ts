import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, JoinColumn, DeleteDateColumn } from 'typeorm';
import { Profile } from '../../profile/entities/profile.entity';
import { Status } from '../../status/entities/status.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ unique: true })
  email: string;

  @Column()
  hash: string;

 

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany(() => Status, status => status.user,)
  statuses: Status[];

  @OneToOne(() => Profile, profile => profile.user,)
  @JoinColumn({name: 'profile_id'})
  profile: Profile;
}