import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../user.entity';
import { CreateUserDto } from '../dto/create-user.dto'
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

  @Post('register')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
      return await this.userService.createUser(createUserDto);
    }
  
  @Get(':id')
  async findUserById(@Param('id') id: number): Promise<User> {
    return this.userService.findUserById(id);
  }
        
    }




