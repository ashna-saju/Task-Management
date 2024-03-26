import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn
} from 'typeorm'
import { Task } from '../entities/task.entity'

/**
 * Users
 * This entity represents a user in the system.
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column()
  name: string
  @Column()
  username: string
  @Column()
  email: string
  @Column()
  password: string
  @CreateDateColumn()
  createdAt: Date

  /**
   * tasks
   * A collection of tasks associated with this user
   */
  @OneToMany(() => Task, (task) => task.userId)
  task: Task[]
}
