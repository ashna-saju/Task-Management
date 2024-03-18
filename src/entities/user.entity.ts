import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm'
import { Tasks } from '../entities/task.entity'
import { v4 as uuidv4 } from 'uuid';
@Entity()
export class Users {
  
  /**
   * User
   * This entity represents a user in the system.
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column({ name: 'user_name' })
  username: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  /**
   * tasks
   * A collection of tasks associated with this user.
   */
  @OneToMany(() => Tasks, (task) => task.userId)
  tasks: Tasks[];
}
