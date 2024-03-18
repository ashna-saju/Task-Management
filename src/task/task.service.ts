import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { AuthService } from '../auth/auth.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Tasks } from '../entities/task.entity'
import { Repository } from 'typeorm'
import { TaskResponseDto } from './dto/task-response.dto'
import { TokenService } from '../userAuthentication/token.service'
import { taskResponseMessages } from 'src/responses/task-response-messages.constants'
@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Tasks)
    private taskRepository: Repository<Tasks>,
    private authService: AuthService,
    private tokenService:TokenService
  ) {}

  /**
   * Creates a new task.
   * @param {string} token - The JWT token.
   * @body {CreateTaskDto} createTaskDto - The data to create the task.
   * @returns {Promise<Task>} The created task.
   * @throws {UnauthorizedException} Invalid or missing token.
   */
  // async createTask(token: string, createTaskDto: CreateTaskDto): Promise<TaskResponseDto<Tasks>> {
    // const decodedUser = await this.authService.decodeToken(token);
    // if (!decodedUser || !decodedUser.username) {
    //   throw new UnauthorizedException('Invalid or missing token');
    // }
    // const userId = decodedUser.sub;
    // createTaskDto.userId = userId;
  //   const newTask = this.taskRepository.create(createTaskDto);
  //   const savedTask = await this.taskRepository.save(newTask);
  //   return new TaskResponseDto<Tasks>(true, 'Task created successfully', savedTask);
  // }
  async createTask(token: string, createTaskDto: CreateTaskDto): Promise<TaskResponseDto<Tasks>> {
    // console.log(token)
    // const decodedUser = await this.authService.decodeToken(token);
    // console.log(await this.authService.decodeToken(token))
    // console.log(decodedUser)
    // if (!decodedUser || !decodedUser.username) {
    //   throw new UnauthorizedException('Invalid or missing token');
    // }
    // const userId = decodedUser.userid;
    // createTaskDto.userId = userId;
    // console.log(createTaskDto.userId)
    const userId = await this.tokenService.getUserIdFromToken(token);
    createTaskDto.title = createTaskDto.title.trim();
    createTaskDto.description = createTaskDto.description.trim();
    const newTask = this.taskRepository.create({...createTaskDto,userId});
    console.log(newTask)
    const savedTask = await this.taskRepository.save(newTask);
    console.log(savedTask)
    return new TaskResponseDto<Tasks>(true, taskResponseMessages.TASK_CREATED_SUCCESSFUL, savedTask);
  }
  
  /**
   * Retrieves tasks by user ID.
   * @param {number} userId - The ID of the user.
   * @returns {Promise<Task[]>} Array of tasks belonging to the user.
   * @throws {NotFoundException} Task not found.
   */
  async getTasksByUserId(userId: string): Promise<Tasks[]> {
    const tasks = await this.taskRepository.find({ where: { userId } });
    if (!tasks || tasks.length === 0) {
      throw new NotFoundException(taskResponseMessages.NO_TASKS_FOUND);
    }
    return tasks;
  }

  /**
   * Updates a task.
   * @param {string} token - The JWT token.
   * @param {number} id - The ID of the task to update.
   * @body {Partial<Task>} updateTaskDto - The data to update the task.
   * @returns {Promise<{ message: string; updatedTask: Task }>} Message and updated task.
   * @throws {UnauthorizedException} Invalid or missing token.
   * @throws {NotFoundException} Task not found.
   */

  
  
  async updateTask(token: string, id: string, updateTaskDto: Partial<Tasks>): Promise<TaskResponseDto<Tasks>> {
    const task = await this.taskRepository.findOne({ where: { id } });
    // const decodedUser = await this.authService.decodeToken(token);
    // if (!decodedUser || !decodedUser.sub) {
    //   throw new UnauthorizedException('Invalid or missing token');
    // }
    const userId = await this.tokenService.getUserIdFromToken(token);
    if (!task) {
      throw new NotFoundException(taskResponseMessages.TASK_NOT_FOUND);
    }
    if (task.userId !== userId) {
      throw new UnauthorizedException(taskResponseMessages.TASK_UPDATE_UNAUTHORIZED);
    }
    Object.assign(task, updateTaskDto);
    const updatedTask = await this.taskRepository.save(task);
    return new TaskResponseDto<Tasks>(true,taskResponseMessages.TASK_UPDATED_SUCCESSFUL, updatedTask);
  }
  

  /**
   * Deletes a task.
   * @param {string} token - The JWT token.
   * @param {number} id - The ID of the task to delete.
   * @returns {Promise<{ message: string }>} Message indicating successful deletion.
   * @throws {UnauthorizedException} Invalid or missing token.
   * @throws {NotFoundException} Task not found.
   */

  async deleteTask(token: string, id: string): Promise<TaskResponseDto<null>> {
    // const decodedUser = await this.authService.decodeToken(token);
    // if (!decodedUser || !decodedUser.sub) {
    //   throw new UnauthorizedException('Invalid or missing token');
    // }
    const task = await this.taskRepository.findOne({ where: { id } });
    const userId = await this.tokenService.getUserIdFromToken(token);
    if (!task) {
      throw new NotFoundException(taskResponseMessages.TASK_NOT_FOUND);
    }
    if (task.userId !== userId) {
      throw new UnauthorizedException(taskResponseMessages.UNAUTHORIZED_TASK_DELETION);
    }
    await this.taskRepository.remove(task);
    return new TaskResponseDto<null>(true,taskResponseMessages.TASK_DELETED_SUCCESSFUL);
  }
}
