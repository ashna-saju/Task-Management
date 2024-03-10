import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
/**
 * UserController
 * This controller handles HTTP requests related to user management, which includes:
   - Create a new user.
   - Retrieve user details using ID.
 */
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  //API URL-POST:/task-management/user/register
  //Create user details
  //Request body shall contain
  //1.username:string mandatory not empty min length - 3
  //2.email:string mandatory unique
  //3.password:string mandatory not empty
  //The system shall check the following:
  //a.If the mandatory field does not have any values, then
  //the system shall return an error message '<Field Name> is required'
  //b.If the email address provided is not in valid format, then
  //the system shall return an error message 'email must be an email'
  //c.If the email address already exists, then
  //the system shall return an error message 'User with the provided email already exists'
  //d.If the above validation is passed, then
  //1. The system shall save the details to the DB
  //2. System shall return the message ''User added successfully '
  /**
   * Function create the employee details
   * @body CreateUserDto
   * @returns {Promise<User>}
   * @memberof UserController
   */
  @Post('register')
  async createUser(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ): Promise<string | User> {
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
  //API URL: GET:/task-management/user/:id
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
  @Get(':id')
  async findUserById(@Param('id') id: number): Promise<User> {
    return this.userService.findUserById(id);
  }
}
