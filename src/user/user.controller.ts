import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Request
} from '@nestjs/common'
import { UserService } from './user.service'
import { Users } from '../entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UserResponseDto } from './dto/user-response.dto'
import { AuthGuard } from 'src/auth/auth.guard'
import { userResponseMessages } from 'src/responses/user-response-messages.constants'

/**
 * UserController
 * This controller handles HTTP requests related to user management, which includes:
   - Create a new user.
   - Retrieve user details using ID.
 */
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  //API URL-POST:/users
  //Create user details
  //Request body shall contain
  //1.username:string mandatory not empty min length - 3
  //2.email:string mandatory unique
  //3.password:string mandatory not empty, must contain at least one number, one letter, one special character, and be at least 8 characters long.
  //The system shall check the following:
  //a.If the mandatory field does not have any values, then
  //the system shall return an error message '<Field Name> is required'
  //b.If the email address provided is not in valid format, then
  //the system shall return an error message 'email must be an email'
  //c.If the email address already exists, then
  //the system shall return an error message 'User with the provided email already exists'
  //d.If the password is not in the valid format, then
  //the system shall return an error message 'Password must contain at least one number, one letter, one special character, and be at least 8 characters long'
  //e.If the above validation is passed, then
  //1. The system shall save the details to the DB
  //2. System shall return the message ''User added successfully '
  /**
   * Function create the user details
   * @body CreateUserDto
   * @returns {Promise<User>}
   * @memberof UserController
   */
  // @Post()
  // async createUser(
  //   @Body() createUserDto: CreateUserDto,
  // ): Promise<UserResponseDto> {
  //   try {
  //     await this.userService.createUser(createUserDto);
  //     return {
  //       success: true,
  //       message: 'User registration successful.',
  //     };
  //   } catch (error) {
  //     throw new BadRequestException(error.message);
  //   }
  // }
  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    try {
      const newUser = await this.userService.createUser(createUserDto);
      return new UserResponseDto(true,userResponseMessages.REGISTRATION_SUCCESSFUL );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  
  //API URL: GET:/users/:id
  //Retrieves a user by their id
  //a. The function takes a parameter 'id' , which specifies the id of the user to be retrieved.
  //b. Then it calls the function 'findUserById' to retrieve the user from the database.
  //c. If a user with the ID is not found, then it throws a 'NotFoundException' with an error message 'User not found'.
  //d. If a user is found, then it returns the user object.
  /**
   * This function retrieves a user by their id.
   * @param id
   * @returns {Promise<User>}
   */
  @UseGuards(AuthGuard)
  @Get('id/:id')
  async findUserById(@Param('id') id: string): Promise<Users> {
    return this.userService.findUserById(id);
  }

  //API URL: GET:/users/:username
  //Retrieves a user by their username
  //a. The function takes a parameter 'username' , which specifies the id of the user to be retrieved.
  //b. Then it calls the function 'findUserByUsername' to retrieve the user from the database.
  //c. If a user with the Username is not found, then it throws a 'NotFoundException' with an error message 'User not found'.
  //d. If a user is found, then it returns the user object.
  /**
   * This function retrieves a user by their username.
   * @param username
   * @returns {Promise<User>}
   */
  @UseGuards(AuthGuard)
  @Get('username/:username')
  async getUserByUsername(@Param('username') username: string): Promise<Users> {
    return this.userService.findUserByUsername(username);
  }  

  
  @UseGuards(AuthGuard)
  @Patch()
  async updateUser(
    @Body() updateUserDto: Partial<CreateUserDto>,
    @Request() req: any // Import Request from '@nestjs/common' or 'express'
  ): Promise<UserResponseDto> {
    try {
      const userId = req.user.userid; // Access userId from req.user
      await this.userService.updateUser(userId, updateUserDto);
      return {
        success: true,
        message: userResponseMessages.DETAILS_UPDATED_SUCCESSFUL,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @UseGuards(AuthGuard)
  @Delete()
  async deleteUser(
    @Request() req: any 
  ): Promise<UserResponseDto> {
    try {
      const userId = req.user.id; 
      await this.userService.deleteUser(userId);
      return {
        success: true,
        message:userResponseMessages.USER_DELETED_SUCCESSFUL,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
