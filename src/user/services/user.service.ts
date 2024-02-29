import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  // findOne(username: string) {
  //     throw new Error('Method not implemented.');
  // }
  constructor(@InjectRepository(User) private userRepository:Repository<User>){}
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({where: { id }});
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

}

