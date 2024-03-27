import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '../auth/auth.module'
import { TaskService } from './task.service'
import { TaskController } from './task.controller'
import { Task } from '../entities/task.entity'
import { UserModule } from '../user/user.module'

/**
 * Module for handling tasks.
 * This module encapsulates functionality related to task management.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Task]), AuthModule, UserModule],
  providers: [TaskService],
  controllers: [TaskController]
})
export class TaskModule {}

