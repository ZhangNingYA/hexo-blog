import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Classes } from '../../classes/entities/class.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id;

  @Column({
    type: 'nvarchar',
  })
  name;

  @ManyToOne(() => User, (user) => user.student)
  @JoinColumn({ name: 'teacher' })
  user: User;

  @Column()
  grade: string;

  @Column()
  age: number;

  @ManyToOne(() => Classes, (classes) => classes.student)
  @JoinColumn({ name: 'class' })
  classes: Classes;

  @Column({
    type: 'nvarchar',
  })
  family;

  @Column({
    type: 'nvarchar',
  })
  requirement;

  @Column({
    type: 'nvarchar',
  })
  promise;
}
