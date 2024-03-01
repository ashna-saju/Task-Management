import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
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
  // @UseGuards(AuthGuard) 
  // @Patch(':id')
  // updateTask(
  //   @Request() req,
  //   @Param('id') id: number,
  //   @Body() updateTaskDto: Partial<Task>
  // ): Promise<Task> {
  //   const token = req.headers.authorization.replace('Bearer ', '');
  //   return this.taskService.updateTask(token, id, updateTaskDto);
  // }
  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateTask(
    @Request() req,
    @Param('id') id: number,
    @Body() updateTaskDto: Partial<Task>
  ): Promise<{ message: string, updatedTask: Task }> {
    const token = req.headers.authorization.replace('Bearer ', '');
    const { message, updatedTask } = await this.taskService.updateTask(token, id, updateTaskDto);
    return { message, updatedTask };
  }

  @UseGuards(AuthGuard)
@Delete(':id')
async deleteTask(
  @Request() req,
  @Param('id') id: number,
): Promise<{ message: string }> {
  const token = req.headers.authorization.replace('Bearer ', '');
  return await this.taskService.deleteTask(token, id);
}
}
