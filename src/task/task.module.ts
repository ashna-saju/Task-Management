// import { Module } from '@nestjs/common';
// import { TaskService } from './services/task.service';
// import { TaskController } from './controllers/task.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Task } from './task.entity';
// import { AuthModule } from 'src/auth/auth.module';
// import { AuthService } from 'src/auth/auth.service';
// import { UserService } from 'src/user/services/user.service';

// @Module({
//   imports:[
//     TypeOrmModule.forFeature([Task]),
//     AuthModule
//   ],
//   providers: [TaskService, UserService,AuthService],
//   controllers: [TaskController]
// })
// export class TaskModule {}
import { Module } from '@nestjs/common';
import { TaskService } from './services/task.service';
import { TaskController } from './controllers/task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Task]),
    AuthModule,
    UserModule, 
  ],
  providers: [TaskService],
  controllers: [TaskController]
})
export class TaskModule {}
