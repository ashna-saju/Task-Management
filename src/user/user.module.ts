import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { Users } from '../entities/user.entity'
@Module({

  /**
   * UserModule
   * This module encapsulates functionality related to user management.
   */
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
