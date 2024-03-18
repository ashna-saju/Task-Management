import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Users } from '../entities/user.entity'

/**
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
  @Column({ name: 'updated_by', nullable: true }) 
  updatedBy: string;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
  @ManyToOne(() => Users, (user) => user.tasks)
  @JoinColumn({ name: 'created_by' })
  userId: string;
}
