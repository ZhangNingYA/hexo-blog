import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Blog } from '../../blog/entities/blog.entity';
@Entity()
export class File {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id;
  @Column({ type: 'nvarchar' })
  name;
  @Column({ type: 'nvarchar' })
  path;
  @Column({ type: 'nvarchar' })
  type;
  @Column({ type: 'nvarchar' })
  size;
  @CreateDateColumn()
  created;
  @UpdateDateColumn()
  updated;
  @ManyToOne(() => Blog, (blog) => blog.file)
  blog: Blog;
}
