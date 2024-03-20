import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './contants';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { Users } from '../entities/user.entity';
import { UserService } from 'src/user/user.service';

/**
 * Module for managing authentication-related features
 * This module encapsulates functionality related to authentication
 * It provides services for handling authentication-related operations and controllers for defining API endpoints
 */
@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, UserService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

