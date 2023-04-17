import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Classes } from '../../classes/entities/class.entity';
import { Student } from '../../student/entities/student.entity';
import { Blog } from '../../blog/entities/blog.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id;

  @Column({
    type: 'nvarchar',
  })
  name;

  @Column()
  @Exclude()
  password: string;

  @Column({
    unique: true,
  })
  email: string;

  @OneToMany(() => Classes, (classes) => classes.user)
  classes: Classes[];

  @OneToMany(() => Student, (student) => student.user)
  student: Student[];

  @OneToMany(() => Blog, (blog) => blog.user)
  blog: Blog[];

  @Column()
  role: string;
}
