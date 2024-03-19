import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Users } from '../entities/user.entity';

/**
 * Tasks
 * Entity representing a task.
 */
@Entity()
export class Tasks {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  priority: string;
  @Column({ type: 'timestamp', name: 'due_date' })
  dueDate: Date;
  @Column({ default: false, name: 'is_completed' })
  isCompleted: boolean;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
  @ManyToOne(() => Users, (user) => user.task)
  @JoinColumn({ name: 'user_id' })
  user: Users;
  @Column({name: 'user_id'})
  userId: string;
}
