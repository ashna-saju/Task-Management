import {
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
import { AuthGuard } from '../auth/auth.guard'
import { UserService } from './user.service'
import { User } from '../entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UserResponseDto } from './dto/user-response.dto'
import { Users } from './user.decorator'
import { ViewUserResponseDto } from './dto/view-user-response.dto'

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
    @Users() user: User,
    @Body() createUserDto: CreateUserDto
  ): Promise<UserResponseDto> {
    return this.userService.createUser(createUserDto)
  }

  //API URL: GET:/users/:username
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
  @Get(':username')
  async getUserByUsername(
    @Users() user: User,
    @Param('username') username: string
  ): Promise<ViewUserResponseDto> {
    return this.userService.findUserByUsername(username)
  }

  //API URL: GET:/users/id/:id
  //Retrieves a user by their id
  // Protected by the AuthGuard and user decorator, which ensures that only authenticated users can view the user details by id
  //a. The function takes a parameter 'id' , which specifies the id of the user to be retrieved.
  //b. Then it calls the function 'findUserById' to retrieve the user details from the database.
  //c. If a user with the id is not found, then it throws a 'NotFoundException' with an error message 'User not found'.
  //d. If a user is found, then it returns the id, name, username, email.
  /**
   * This function retrieves a user by their id.
   * @param id The username of the user to be retrieved.
   * @returns A promise resolving to returning the id, name, username, email if found.
   * @throws NotFoundException if the user with the specified id is not found.
   */
  @UseGuards(AuthGuard)
  @Get('id/:id')
  async findUserById(
    @Users() user: User,
    @Param('id') id: string,
  ): Promise<ViewUserResponseDto> {
    return this.userService.findUserById(id)
  }

  // API URL: PATCH:/users
  // Updates a user's profile information
  // Protected by the AuthGuard and user decorator, which ensures that only authenticated users can update their profile
  // a. The function takes parameters 'updateUserDto', 'req', 'id'.
  // b. It calls the 'updateUser' function in the user service, passing the extracted token, id, and updated user details.
  // d. The 'updateUser' function retrieves the user by id, updates their profile information with the provided DTO, and saves the changes to the database.
  // e. Upon successful update, it returns a success response with the message 'User details updated successfully'.
  /**
   * Updates a user's profile information.
   * @param user The authenticated user object.
   * @body updateUserDto The DTO containing the updated user information.
   * @param req The HTTP request object.
   * @param id The id of the user to be updated.
   * @returns A promise resolving to a UserResponseDto indicating the success of the update operation.
   */
  @UseGuards(AuthGuard)
  @Patch()
  async updateUser(
    @Users() user: User,
    @Body() updateUserDto: Partial<User>,
    @Request() req,
    id: string
  ): Promise<UserResponseDto> {
    id = req.user.id
    const token = req.headers.authorization.replace('Bearer ', '')
    return this.userService.updateUser(token, id, updateUserDto)
  }

  // API URL: DELETE:/users
  // Deletes a user's account
  // Protected by the AuthGuard and user decorator, which ensures that only authenticated users can delete their account
  // a. The function takes parameters 'req', 'id'.
  // b. It calls the 'deleteUser' function in the user service, passing the extracted token and id.
  // c. The 'deleteUser' function in the service retrieves the user by id and removes their account from the database.
  // d. Upon successful deletion, it returns a success response with the message 'User deleted successfully'.
  /**
   * Deletes a user's account.
   * @param user The authenticated user object.
   * @param req The HTTP request object.
   * @param id The id of the user to be deleted.
   * @returns A promise resolving to a UserResponseDto indicating the success of the delete operation.
   */
  @UseGuards(AuthGuard)
  @Delete()
  async deleteUser(
    @Users() user: User,
    @Request() req,
    id: string
  ): Promise<UserResponseDto> {
    id = req.user.id
    const token = req.headers.authorization.replace('Bearer ', '')
    return this.userService.deleteUser(token, id)
  }
}

