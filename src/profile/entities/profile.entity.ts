import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, DeleteDateColumn } from 'typeorm';

@Entity({ name: 'profiles' })
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  age: number;

  @Column()
  address: string

  @Column()
  occupation:string

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToOne(() => User, user => user.profile)
  @JoinColumn({name: 'user_id'})
  user: User;
}