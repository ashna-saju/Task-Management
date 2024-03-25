import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { encodePassword } from 'src/utils/bcrypt.utils';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from '../entities/user.entity';
import { config } from 'src/config/messages/config';
import { UserResponseDto } from './dto/user-response.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  /**
   * createUser
   * Creates a new user with the provided details.
   * @body createUserDto The DTO containing user creation parameters.
   * @throws BadRequestException if required fields are missing, if a user with the provided email already exists,
   * or if a user with the provided username already exists.
   * This method performs the following operations:
   * 1. Checks if the email already exists in the database.
   * 2. Checks if the username already exists in the database.
   * 3. Trims whitespace from the name, username, and email fields.
   * 4. Encrypts the password using a specified encryption method.
   * 5. Creates a new user entity with the provided data.
   * 6. Saves the new user entity to the database.
   */
  async createUser(createUserDto: CreateUserDto): Promise<void> {
    // Check if the email and username already exist
    const existingUserEmail = await this.userRepository.findOne({ where: { email: createUserDto.email } });
    if (existingUserEmail) {
      throw new BadRequestException(config.EMAIL_ALREADY_EXISTS);
    }
    const existingUsername = await this.userRepository.findOne({ where: { username: createUserDto.username } });
    if (existingUsername) {
      throw new BadRequestException(config.USERNAME_ALREADY_EXISTS);
    }
    
    // Trim and lowercase the fields
    createUserDto.name = createUserDto.name.trim();
    createUserDto.username = createUserDto.username.trim();
    createUserDto.email = createUserDto.email.trim().toLowerCase();
    
    // Hash the password
    const hashedPassword = encodePassword(createUserDto.password);
    
    // Create a new user entity with the hashed password
    const newUser = this.userRepository.create({ ...createUserDto, password: hashedPassword });
    // const newUser = this.userRepository.create({ ...createUserDto });
    
    // Save the new user entity to the database
    await this.userRepository.save(newUser);
  }

  /**
   * findUserByUsername
   * Retrieves a user by their Username.
   * @param username The Username of the user to be retrieved.
   * @returns A promise resolving to returning the id, name, username, email if found.
   * @throws NotFoundException if the user with the specified Username is not found.
   */
  async findUserByUsername(username: string): Promise<Users> {
    const user = await this.userRepository.findOne({
      where: { username },
      // select: ['id', 'username', 'email', 'name'],
    });
    if (!user) {
      throw new NotFoundException(config.USER_NOT_FOUND);
    }
    return user;
  }
<<<<<<< HEAD

  /**
   * findUserById
   * Retrieves a user by their Id.
   * @param id The id of the user to be retrieved.
   * @returns A promise resolving to returning the id, name, username, email if found.
   * @throws NotFoundException if the user with the specified id is not found.
   */
=======
>>>>>>> 95154a3034fbc290b89c0b04fad7cc87be5e3e6d
  async findUserById(id: string): Promise<Users> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'username', 'email', 'name'],
    });
    if (!user) {
      throw new NotFoundException(config.USER_NOT_FOUND);
    }
    return user;
  }
<<<<<<< HEAD

  /**
   * Updates a user's profile information.
   * @param user The authenticated user object.
   * @body updateUserDto The DTO containing the updated user information.
   * @param req The HTTP request object.
   * @param id The id of the user to be updated.
   * @returns A promise resolving to a UserResponseDto indicating the success of the update operation.
   */
  async updateUser(
    token: string,
=======
  async updateUser(
    token:string,
>>>>>>> 95154a3034fbc290b89c0b04fad7cc87be5e3e6d
    id: string,
    updateUserDto: Partial<CreateUserDto>,
  ): Promise<UserResponseDto> {
    const user = await this.findUserById(id);
    Object.assign(user, updateUserDto);
    await this.userRepository.save(user);
    return new UserResponseDto(true, config.DETAILS_UPDATED_SUCCESSFUL);
  }

<<<<<<< HEAD
  /**
   * Deletes a user's account.
   * @param user The authenticated user object.
   * @param req The HTTP request object.
   * @param id The id of the user to be deleted.
   * @returns A promise resolving to a UserResponseDto indicating the success of the delete operation.
   */
  async deleteUser(token: string, id: string): Promise<UserResponseDto> {
=======
  async deleteUser(token:string,id: string): Promise<UserResponseDto> {
>>>>>>> 95154a3034fbc290b89c0b04fad7cc87be5e3e6d
    const user = await this.findUserById(id);
    await this.userRepository.remove(user);
    return new UserResponseDto(true, config.USER_DELETED_SUCCESSFUL);
  }
}



