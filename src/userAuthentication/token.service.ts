import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {AuthService } from '../auth/auth.service'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tasks } from 'src/entities/task.entity';
@Injectable()
export class TokenService {
  constructor(
    private authService: AuthService
  ) {}

  async getUserIdFromToken(token: string): Promise<string> {
    const decodedUser = await this.authService.decodeToken(token);
    if (!decodedUser || !decodedUser.userid) {
      throw new UnauthorizedException('Invalid token');
    }
    return decodedUser.userid;
  }
}
