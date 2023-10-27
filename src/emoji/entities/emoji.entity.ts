import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Status } from '../../status/entities/status.entity';
import { Statuses_Emojis } from "src/statuses_emojis/entities/statuses_emojis.entity";
import { IsOptional } from "class-validator";

@Entity({ name: 'emojis' })
export class Emoji {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  react_at: Date;

  @Column()
  name: string;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany(()=> Statuses_Emojis,statusEmoji => statusEmoji.emoji,)
  statusesEmojis: Statuses_Emojis[]
  
}
