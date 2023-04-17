import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { File } from "../../file/entities/file.entity";

@Entity()
export class Blog {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id;
  @ManyToOne(() => User, (user) => user.blog)
  @JoinColumn({ name: 'author' })
  user: User;
  @Column({
    type: 'nvarchar',
  })
  text;
  @CreateDateColumn()
  created;
  @UpdateDateColumn()
  updated;
  @OneToMany(() => File, (file) => file.blog)
  file: File[];
}
