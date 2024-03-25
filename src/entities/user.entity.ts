import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn
} from 'typeorm'
import { Tasks } from '../entities/task.entity'

/**
 * Users
 * This entity represents a user in the system.
 */
@Entity()
export class Users {
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
  @OneToMany(() => Tasks, (task) => task.userId)
  task: Tasks[]
}
