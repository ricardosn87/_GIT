import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Course } from './courses.entity';
import { randomUUID } from 'node:crypto';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Course, (course) => course.tags)
  course: Course[];

  @BeforeInsert()
  generatedId() {
    if (this.id) {
      return;
    }
    this.id = randomUUID();
  }
}
