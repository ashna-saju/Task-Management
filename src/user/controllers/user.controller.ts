import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<string | User> {
    try {
      await this.userService.createUser(createUserDto);
      return 'User successfully added';
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return error.response.data.message; 
      } else {
        throw error; 
      }
    }
  }

  @Get(':id')
  async findUserById(@Param('id') id: number): Promise<User> {
    return this.userService.findUserById(id);
  }
}



