import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Student } from '../../student/entities/student.entity';

@Entity()
export class Classes {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id;

  @Column({
    type: 'nvarchar',
  })
  name;

  @ManyToOne(() => User, (user) => user.classes, { nullable: false })
  @JoinColumn({ name: 'teacher' })
  // @JoinColumn({ name: 'teacher', referencedColumnName: 'id' })
  user: User;

  @OneToMany(() => Student, (student) => student.classes)
  student: Student[];

  @Column()
  assistant: number;

  @Column({
    type: 'nvarchar',
  })
  extra;

  @Column()
  blog: string;
}
