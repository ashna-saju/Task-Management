import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Users } from '../entities/user.entity'
import { encodePassword } from 'src/utils/bcrypt.utils'
import { userResponseMessages } from 'src/responses/user-response-messages.constants'
@Injectable()
export class UserService {

  /**
   * UserService
   * This service class provides methods for user management, including user creation and retrieval.
   * It interacts with the UserRepository to perform CRUD operations on User entities.
   */
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  /**
   * createUser
   * Creates a new user with the provided details.
   * @body createUserDto The DTO containing user creation parameters.
   * @throws BadRequestException if required fields are missing or if a user with the provided email already exists.
   */
  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const existingUserEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email }
    });
    if (existingUserEmail) {
      throw new BadRequestException(
        userResponseMessages.EMAIL_ALREADY_EXISTS,
      );
    }
    const existingUsername = await this.userRepository.findOne({
      where: { username:createUserDto.username }
    });
    if (existingUsername) {
      throw new BadRequestException(
        userResponseMessages.USERNAME_ALREADY_EXISTS,
      );
    }
    createUserDto.name = createUserDto.name.trim();
    createUserDto.username = createUserDto.username.trim();
    createUserDto.email = createUserDto.email.trim().toLowerCase();
    const password=encodePassword(createUserDto.password)
      console.log(password)
    const newUser = this.userRepository.create({...createUserDto,password});
    await this.userRepository.save(newUser);
  }

  /**
   * findUserById
   * Retrieves a user by their ID.
   * @param id The ID of the user to be retrieved.
   * @throws NotFoundException if the user with the specified ID is not found.
   * @returns The user object if found.
   */
  async findUserById(id: string): Promise<Users> {
    const user = await this.userRepository.findOne({ where: { id },select: ['id', 'username', 'email', 'name'] });
    if (!user) {
      throw new NotFoundException(userResponseMessages.USER_NOT_FOUND);
    }
    return user;
  }

  /**
   * findUserByUsername
   * Retrieves a user by their Username.
   * @param username The Username of the user to be retrieved.
   * @throws NotFoundException if the user with the specified Username is not found.
   * @returns The user object if found.
   */
  async findUserByUsername(username: string): Promise<Users> {
    const user = await this.userRepository.findOne({ where: { username }});
    if (!user) {
      throw new NotFoundException(userResponseMessages.USER_NOT_FOUND);
    }
    return user;
  }

  // async updateUser(id: string, updateUserDto: Partial<CreateUserDto>): Promise<void> {
  //   const user = await this.findUserById(id);
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }
  //   Object.assign(user, updateUserDto);
  //   await this.userRepository.save(user);
  // }

  // async deleteUser(id: string): Promise<void> {
  //   const user = await this.findUserById(id);
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }
  //   await this.userRepository.remove(user);
  // }
  async updateUser(id: string, updateUserDto: Partial<CreateUserDto>): Promise<void> {
      const user = await this.findUserById(id);
      Object.assign(user, updateUserDto);
      await this.userRepository.save(user);   
  }

  async deleteUser(id: string): Promise<void> {
      const user = await this.findUserById(id);
      await this.userRepository.remove(user);
}
}