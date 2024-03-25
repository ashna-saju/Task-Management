import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { TaskModule } from './task/task.module'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

@Module({
  /**
   * AppModule
   * This module serves as the root module of the NestJS application.
   * It imports and configures other modules required for the application, including user management, task management, and authentication.
   * It also defines the main controller and service used by the application.
   */
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      // Configuring TypeORM to establish a connection to the PostgreSQL database.
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy()
    }),
    UserModule,
    TaskModule,
    AuthModule
  ]
})
export class AppModule {}
