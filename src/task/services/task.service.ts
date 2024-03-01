import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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

    if (!decodedUser || !decodedUser.sub) {
      throw new UnauthorizedException('Invalid or missing token');
    }
    const userId = decodedUser.sub;

    createTaskDto.userId = userId;
    const newTask = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(newTask);
  }

  async getTasksByUserId(userId: number): Promise<Task[]> {
    return this.taskRepository.find({ where: { userId } });
  }

  async updateTask(
    token: string,
    id: number,
    updateTaskDto: Partial<Task>,
  ): Promise<{ message: string; updatedTask: Task }> {
    const task = await this.taskRepository.findOne({ where: { id } });
    const decodedUser = await this.authService.decodeToken(token);

    if (!decodedUser || !decodedUser.sub) {
      throw new UnauthorizedException('Invalid or missing token');
    }
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    if (task.userId !== decodedUser.sub) {
      throw new UnauthorizedException(
        'You are not authorized to update this task',
      );
    }

    Object.assign(task, updateTaskDto);
    const updatedTask = await this.taskRepository.save(task);
    return { message: 'Task updated successfully', updatedTask };
  }
  async deleteTask(token: string, id: number): Promise<{ message: string }> {
    const decodedUser = await this.authService.decodeToken(token);

    if (!decodedUser || !decodedUser.sub) {
      throw new UnauthorizedException('Invalid or missing token');
    }

    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.userId !== decodedUser.sub) {
      throw new UnauthorizedException(
        'You are not authorized to delete this task',
      );
    }

    await this.taskRepository.remove(task);

    return { message: 'Task deleted successfully' };
  }
}
