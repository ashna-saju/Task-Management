import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn
} from 'typeorm'
import { Users } from '../entities/user.entity'

/**
 * Tasks
 * Entity representing a task.
 */
@Entity()
export class Tasks {
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
  @ManyToOne(() => Users, (user) => user.task)
  @JoinColumn()
  user: Users
  @Column()
  userId: string
}
