import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';
describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn(),
            findUserById: jest.fn(),
          },
        },
      ],
    }).compile();
    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });
  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: '35667',
      };
      const createdUser: User = {
        id: 1,
        ...createUserDto,
        tasks: [],
      };
      jest.spyOn(userService, 'createUser').mockResolvedValueOnce();
      jest
        .spyOn(userService, 'findUserById')
        .mockResolvedValueOnce(createdUser);
      const result = await userController.createUser(createUserDto);
      expect(result).toBe('User successfully added');
    });
    it('should throw BadRequestException if required fields are missing', async () => {
      const createUserDto: CreateUserDto = {
        username: '',
        email: '',
        password: '',
      };
      jest
        .spyOn(userService, 'createUser')
        .mockRejectedValueOnce(
          new BadRequestException('The required fields are missing'),
        );
      await expect(
        userController.createUser(createUserDto),
      ).rejects.toThrowError(BadRequestException);
    });
    it('should throw BadRequestException if user with email already exists', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        email: 'existing@example.com',
        password: 'password',
      };
      jest
        .spyOn(userService, 'createUser')
        .mockRejectedValueOnce(
          new BadRequestException(
            'User with the provided email already exists',
          ),
        );
      await expect(
        userController.createUser(createUserDto),
      ).rejects.toThrowError(BadRequestException);
    });
  });
  describe('findUserById', () => {
    it('should find user by id', async () => {
      const userId = 1;
      const user: User = {
        id: userId,
        username: 'testuser',
        email: 'test@example.com',
        password: 'password',
        tasks: [],
      };
      jest.spyOn(userService, 'findUserById').mockResolvedValueOnce(user);

      const result = await userController.findUserById(userId);
      expect(result).toEqual(user);
    });
    it('should throw NotFoundException if user with id not found', async () => {
      const userId = 379;
      jest
        .spyOn(userService, 'findUserById')
        .mockRejectedValueOnce(new NotFoundException('User not found'));
      await expect(userController.findUserById(userId)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
