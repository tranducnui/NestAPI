import { Emoji } from './../../emoji/entities/emoji.entity';
import { DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Status } from '../../status/entities/status.entity';

@Entity({ name: 'statuses_emojis' })
export class Statuses_Emojis {

    @PrimaryGeneratedColumn()
    id: number

    @PrimaryColumn()
    status_id: number;

    @PrimaryColumn()
    emoji_id: number;

    @DeleteDateColumn()
    deleted_at: Date;

    @ManyToOne(() => Status, status => status.statusesEmojis)
    @JoinColumn({ name: 'status_id' })
    status: Status;

    @ManyToOne(() => Emoji, emoji => emoji.statusesEmojis)
    @JoinColumn({ name: 'emoji_id' })
    emoji: Emoji;
}