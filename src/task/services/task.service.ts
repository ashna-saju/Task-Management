// import { Injectable } from '@nestjs/common';
// import { CreateTaskDto } from '../dto/create-task.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Task } from '../task.entity';
// import { Repository } from 'typeorm';

// @Injectable()
// export class TaskService {
//   authService: any;
//   constructor(
//     @InjectRepository(Task)
//     private taskRepository: Repository<Task>,
//   ) {}

//   async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
//     // const decodeUser=await this.authService.decodeToken(token);
//     const newTask = this.taskRepository.create(createTaskDto);
//     return await this.taskRepository.save(newTask);
//   }
// }
/////////////////////////////////////////////////////////////////////////////////////
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { CreateTaskDto } from '../dto/create-task.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Task } from '../task.entity';
// import { Repository } from 'typeorm';
// import { AuthService } from 'src/auth/auth.service';

// @Injectable()
// export class TaskService {
//   constructor(
//     @InjectRepository(Task)
//     private taskRepository: Repository<Task>,
//     private authService: AuthService, 
//   ) {}

//   async createTask(token: string, createTaskDto: CreateTaskDto): Promise<Task> {
//     // Decode the token using the AuthService
//     const decodedUser = await this.authService.decodeToken(token);
//      console.log(decodedUser);
//     // Check if decoded user exists and contains user ID
//     if (!decodedUser || !decodedUser.userId) {
//       throw new UnauthorizedException('Invalid or missing token');
//     }
//     const userId = decodedUser.userId;

//     // Associate the user ID with the task DTO
//     createTaskDto.userId = userId;

//     // Create and save the task
//     const newTask = this.taskRepository.create(createTaskDto);
//     return this.taskRepository.save(newTask);
//   }
// }
/////////////////////////////////////////////////////////////////
// task.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../task.entity';
import { Repository } from 'typeorm';
import { AuthService } from '../../auth/auth.service'; // Adjust the path as per your directory structure

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private authService: AuthService,
  ) {}

  async createTask(token: string, createTaskDto: CreateTaskDto): Promise<Task> {
    // Decode the token using the AuthService
   
    const decodedUser = await this.authService.decodeToken(token);
    console.log(decodedUser)
    // Check if decoded user exists and contains user ID
    if (!decodedUser || !decodedUser.sub) {
      throw new UnauthorizedException('Invalid or missing token');
    }
    const userId = decodedUser.sub;

    // Associate the user ID with the task DTO
    createTaskDto.userId = userId;
console.log(createTaskDto.userId)
    // Create and save the task
    const newTask = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(newTask);
  }
}
