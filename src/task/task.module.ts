import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Tasks } from '../entities/task.entity';
import { UserModule } from 'src/user/user.module';

/**
 * Module for handling tasks.
 * This module encapsulates functionality related to task management.
 * It provides services for handling task-related operations and controllers for defining API endpoints.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Tasks]), AuthModule, UserModule],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
