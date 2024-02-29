import { User } from 'src/user/user.entity';

export class CreateTaskDto {
  id: number;
  title: string;
  description: string;
  priority: string;
  dueDate: Date;
  completed: boolean;
  userId: number;
}
