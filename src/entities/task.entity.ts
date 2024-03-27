import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn
} from 'typeorm'
import { User } from '../entities/user.entity'

/**
 * Tasks
 * Entity representing a task.
 */
@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  title: string
  @Column()
  description: string
  @Column()
  priority: string;
  @Column({ type: 'timestamp' })
  dueDate: Date;
  @Column({ default: false })
  isCompleted: boolean;
  @CreateDateColumn()
  createdAt: Date
  @UpdateDateColumn()
  updatedAt: Date
  @ManyToOne(() => User, (user) => user.task)
  @JoinColumn()
  user: User
  @Column()
  userId: string
}

