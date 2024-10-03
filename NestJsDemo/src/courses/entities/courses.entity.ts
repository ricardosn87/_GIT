import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tag } from './tags.entity';
import { randomUUID } from 'node:crypto';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date;

  @JoinTable()
  @ManyToMany(() => Tag, (tag) => tag.course, {
    cascade: true,
  })
  tags: Tag[];

  @BeforeInsert()
  generatedId() {
    if (this.id) {
      return;
    }
    this.id = randomUUID();
  }
}
