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
import { userResponseMessages } from 'src/responseMessages/user-response-messages.config';
@Injectable()
export class UserService {
  /**
   * UserService
   * This service class provides methods for user management, including user creation, retrieval, updation, deletion.
   * It interacts with the UserRepository to perform CRUD operations on User entities.
   */
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
    const existingUserEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUserEmail) {
      throw new BadRequestException(userResponseMessages.EMAIL_ALREADY_EXISTS);
    }
    const existingUsername = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (existingUsername) {
      throw new BadRequestException(
        userResponseMessages.USERNAME_ALREADY_EXISTS,
      );
    }
    createUserDto.name = createUserDto.name.trim();
    createUserDto.username = createUserDto.username.trim();
    createUserDto.email = createUserDto.email.trim().toLowerCase();
    const password = encodePassword(createUserDto.password);
    const newUser = this.userRepository.create({ ...createUserDto, password });
    await this.userRepository.save(newUser);
  }

  /**
   * findUserById
   * Retrieves a user by their id.
   * @param id The id of the user to be retrieved.
   * @returns A promise resolving to returning the id, name, username, email if found.
   * @throws NotFoundException if the user with the specified id is not found.
   */
  async findUserById(id: string): Promise<Users> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'name', 'username', 'email'],
    });
    if (!user) {
      throw new NotFoundException(userResponseMessages.USER_NOT_FOUND);
    }
    return user;
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
    });
    if (!user) {
      throw new NotFoundException(userResponseMessages.USER_NOT_FOUND);
    }
    return user;
  }
}
