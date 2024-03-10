import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class UserService {
  /**
   * UserService
   * This service class provides methods for user management, including user creation and retrieval.
   * It interacts with the UserRepository to perform CRUD operations on User entities.
   */
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  /**
   * createUser
   * Creates a new user with the provided details.
   * @body createUserDto The DTO containing user creation parameters.
   * @throws BadRequestException if required fields are missing or if a user with the provided email already exists.
   */
  async createUser(createUserDto: CreateUserDto): Promise<void> {
    if (
      !createUserDto.username ||
      !createUserDto.email ||
      !createUserDto.password
    ) {
      throw new BadRequestException('Required Fields are missing');
    }
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new BadRequestException(
        'User with the provided email already exists',
      );
    }
    const newUser = this.userRepository.create(createUserDto);
    await this.userRepository.save(newUser);
  }
  /**
   * findUserById
   * Retrieves a user by their ID.
   * @param id The ID of the user to be retrieved.
   * @throws NotFoundException if the user with the specified ID is not found.
   * @returns The user object if found.
   */
  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
