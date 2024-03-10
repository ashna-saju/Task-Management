import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Task } from '../task/task.entity';
@Entity()
export class User {
  /**
   * User
   * This entity represents a user in the system.
   */
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  password: string;
  /**
   * tasks
   * A collection of tasks associated with this user.
   */
  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
