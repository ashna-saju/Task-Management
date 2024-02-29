import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../task.entity';
import { Repository } from 'typeorm';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private authService: AuthService,
  ) {}

  async createTask(token: string, createTaskDto: CreateTaskDto): Promise<Task> {
    const decodedUser = await this.authService.decodeToken(token);
    console.log(decodedUser);

    if (!decodedUser || !decodedUser.sub) {
      throw new UnauthorizedException('Invalid or missing token');
    }
    const userId = decodedUser.sub;

    createTaskDto.userId = userId;
    console.log(createTaskDto.userId);
    const newTask = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(newTask);
  }

  async getTasksByUserId(userId: number): Promise<Task[]> {
    return this.taskRepository.find({ where: { userId } });
  }
}
