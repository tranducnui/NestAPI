import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable, JoinColumn, OneToMany, DeleteDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Emoji } from '../../emoji/entities/emoji.entity';
import { Statuses_Emojis } from 'src/statuses_emojis/entities/statuses_emojis.entity';

@Entity({ name: 'statuses' })
export class Status {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  link: string;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => User, user => user.statuses)
  @JoinColumn({name: 'user_id'})
  user: User;

  @OneToMany(()=>Statuses_Emojis,statusEmoji => statusEmoji.status,)
  statusesEmojis: Statuses_Emojis[]

}