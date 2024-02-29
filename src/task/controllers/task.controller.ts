import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Task } from '../task.entity';
import { TaskService } from '../services/task.service';
import { AuthGuard } from '../../auth/auth.guard';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @UseGuards(AuthGuard)
  @Post()
  createTask(
    @Request() req,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    const token = req.headers.authorization.replace('Bearer ', '');
    return this.taskService.createTask(token, createTaskDto);
  }
  @UseGuards(AuthGuard)
  @Get(':userId')
  getTasksByUserId(@Param('userId') userId: number): Promise<Task[]> {
    return this.taskService.getTasksByUserId(userId);
  }
}
