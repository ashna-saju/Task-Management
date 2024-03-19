import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserService } from './user.service';
import { Users } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { userResponseMessages } from 'src/responseMessages/user-response-messages.config';

/**
 * UserController
 * This controller handles HTTP requests related to user management, which includes:
   - Create a new user
   - Retrieve user details using ID
   - Update user details
   - delete user
 */
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  //API URL-POST:/users
  //Create user details
  //Request body shall contain
  //1.name:string mandatory not empty min length - 3
  //2.username:string mandatory not empty min length - 5
  //3.email:string mandatory unique
  //4.password:string mandatory not empty, must contain at least one number, one letter, one special character, and be at least 8 characters long.
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
  //2. System shall return the message
  //   success: true,
  //   message: 'User registration successful.'

  /**
   * Function create the user details
   * @body CreateUserDto
   * @returns {Promise<UserResponseDto>}
   * @memberof UserController
   */
  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    try {
      await this.userService.createUser(createUserDto);
      return new UserResponseDto(
        true,
        userResponseMessages.REGISTRATION_SUCCESSFUL,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  //API URL: GET:/users/id/:id
  //Retrieves a user by their id
  // Protected by the AuthGuard, which ensures that only authenticated users can view the user details by id
  //a. The function takes a parameter 'id' , which specifies the id of the user to be retrieved.
  //b. Then it calls the function 'findUserById' to retrieve the user details from the database.
  //c. If a user with the id is not found, then it throws a 'NotFoundException' with an error message 'User not found'.
  //d. If a user is found, then it returns the id, name, username, email.
  /**
   * This function retrieves a user by their id.
   * @param id The id of the user to be retrieved.
   * @returns A promise resolving to returning the id, name, username, email if found.
   * @throws NotFoundException if the user with the specified id is not found.
   */
  @UseGuards(AuthGuard)
  @Get('id/:id')
  async findUserById(@Param('id') id: string): Promise<Users> {
    return this.userService.findUserById(id);
  }

  //API URL: GET:/users/username/:username
  //Retrieves a user by their username
  // Protected by the AuthGuard, which ensures that only authenticated users can view the user details by username
  //a. The function takes a parameter 'username' , which specifies the username of the user to be retrieved.
  //b. Then it calls the function 'findUserByUsername' to retrieve the user details from the database.
  //c. If a user with the Username is not found, then it throws a 'NotFoundException' with an error message 'User not found'.
  //d. If a user is found, then it returns the id, name, username, email.
  /**
   * This function retrieves a user by their username.
   * @param username The username of the user to be retrieved.
   * @returns A promise resolving to returning the id, name, username, email if found.
   * @throws NotFoundException if the user with the specified username is not found.
   */
  @UseGuards(AuthGuard)
  @Get('username/:username')
  async getUserByUsername(@Param('username') username: string): Promise<Users> {
    return this.userService.findUserByUsername(username);
  }
}
