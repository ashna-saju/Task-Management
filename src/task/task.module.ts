import { Module } from '@nestjs/common';
import { TaskService } from './services/task.service';
import { TaskController } from './controllers/task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
/**
 * Module for handling tasks.
 * This module encapsulates functionality related to task management.
 * It provides services for handling task-related operations and controllers for defining API endpoints.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Task]), AuthModule, UserModule],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
