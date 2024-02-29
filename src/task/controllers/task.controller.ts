// import { Body, Controller, Post } from '@nestjs/common';
// import { CreateTaskDto } from '../dto/create-task.dto';
// import { Task } from '../task.entity';
// import { TaskService } from '../services/task.service';

// @Controller('task')
// export class TaskController {
//     constructor(
//         private taskService: TaskService,
//         ) {}

//     @Post()
//   createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
//   return this.taskService.createTask(createTaskDto);
//   }
// }

// import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
// import { CreateTaskDto } from '../dto/create-task.dto';
// import { Task } from '../task.entity';
// import { TaskService } from '../services/task.service';
// import { AuthGuard } from '../../auth/auth.guard'; // Adjust the path as per your directory structure

// @Controller('task')
// export class TaskController {
//     constructor(private taskService: TaskService) {}

//     @UseGuards(AuthGuard) // Protect the route with JWT authentication
//     @Post()
//     createTask(@Request() req, @Body() createTaskDto: CreateTaskDto): Promise<Task> {
//         const token = req.headers.authorization.replace('Bearer ', '');
//         return this.taskService.createTask(token, createTaskDto);
//     }
// }


// task.controller.ts
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Task } from '../task.entity';
import { TaskService } from '../services/task.service';
import { AuthGuard } from '../../auth/auth.guard'; // Adjust the path as per your directory structure

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) { }

  @UseGuards(AuthGuard) // Protect the route with JWT authentication
  @Post()
  createTask(@Request() req, @Body() createTaskDto: CreateTaskDto): Promise<Task> {
    const token = req.headers.authorization.replace('Bearer ', '');
    return this.taskService.createTask(token, createTaskDto);
  }
}


