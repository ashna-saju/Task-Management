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
        'User with the provided email already exists',
      );
    }
    const existingUsername = await this.userRepository.findOne({
      where: { username:createUserDto.username }
    });
    if (existingUsername) {
      throw new BadRequestException(
        'User with the provided username already exists',
      );
    }
    createUserDto.email = createUserDto.email.toLowerCase();
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
  // async findUserById(id: string): Promise<Users> {
  //   const user = await this.userRepository.findOne({ where: { id },select: ['id', 'username', 'email', 'name'] });
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }
  //   return user;
  // }

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
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
