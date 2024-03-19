import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from '../entities/task.entity';
import { Repository } from 'typeorm';
import { TaskResponseDto } from './dto/task-response.dto';
import { TokenService } from '../userAuthentication/token.service';
import { taskResponseMessages } from 'src/responseMessages/task-response-messages.config';
@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Tasks)
    private taskRepository: Repository<Tasks>,
    private authService: AuthService,
    private tokenService: TokenService,
  ) {}

  /**
   * Creates a new task.
   * @param {string} token - The JWT token.
   * @param {CreateTaskDto} createTaskDto - The data to create the task.
   * @returns {Promise<TaskResponseDto>} A Promise containing the response object for the created task.
   * @throws {UnauthorizedException} If the provided token is invalid or missing.
   */
  async createTask(
    token: string,
    createTaskDto: CreateTaskDto,
  ): Promise<TaskResponseDto> {
    const decodedUser = await this.authService.decodeToken(token);
    if (!decodedUser || !decodedUser.username) {
      throw new UnauthorizedException('Invalid or missing token');
    }
    const userId = decodedUser.userid;
    // const userId = await this.tokenService.getUserIdFromToken(token);
    createTaskDto.userId = userId;
    createTaskDto.title = createTaskDto.title.trim();
    createTaskDto.description = createTaskDto.description.trim();
    const newTask = this.taskRepository.create({ ...createTaskDto });
    const savedTask = await this.taskRepository.save(newTask);
    return new TaskResponseDto(
      true,
      taskResponseMessages.TASK_CREATED_SUCCESSFUL,
      savedTask,
    );
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
   * Updates a task by its id.
   * @param {string} token - The JWT token.
   * @param {string} id - The id of the task to update.
   * @param {Partial<Tasks>} updateTaskDto - The data to update the task.
   * @returns {Promise<TaskResponseDto>} A Promise containing a success message and the updated task.
   * @throws {UnauthorizedException} If the token is invalid or missing, or if the user is not authorized to update the task.
   * @throws {NotFoundException} If the task with the specified id is not found.
   */
  async updateTask(
    token: string,
    id: string,
    updateTaskDto: Partial<Tasks>,
  ): Promise<TaskResponseDto> {
    const task = await this.taskRepository.findOne({ where: { id } });
    // const userId = await this.tokenService.getUserIdFromToken(token);
    const decodedUser = await this.authService.decodeToken(token);
    if (!decodedUser || !decodedUser.sub) {
      throw new UnauthorizedException('Invalid or missing token');
    }
    const userId = decodedUser.userid;
    if (!task) {
      throw new NotFoundException(taskResponseMessages.TASK_NOT_FOUND);
    }
    if (task.userId !== userId) {
      throw new UnauthorizedException(
        taskResponseMessages.TASK_UPDATE_UNAUTHORIZED,
      );
    }
    Object.assign(task, updateTaskDto);
    const updatedTask = await this.taskRepository.save(task);
    return new TaskResponseDto(
      true,
      taskResponseMessages.TASK_UPDATED_SUCCESSFUL,
      updatedTask,
    );
  }

  /**
   * Deletes a task by its id.
   * @param {string} token - The JWT token.
   * @param {string} id - The id of the task to delete.
   * @returns {Promise<TaskResponseDto>} A Promise representing the completion of the task deletion.
   * @throws {NotFoundException} Task not found.
   * @throws {UnauthorizedException} You are not authorized to delete this task.
   */

  async deleteTask(token: string, id: string): Promise<TaskResponseDto> {
    const task = await this.taskRepository.findOne({ where: { id } });
    // const userId = await this.tokenService.getUserIdFromToken(token);
    const decodedUser = await this.authService.decodeToken(token);
    if (!decodedUser || !decodedUser.userid) {
      throw new UnauthorizedException('Invalid token');
    }
    if (!task) {
      throw new NotFoundException(taskResponseMessages.TASK_NOT_FOUND);
    }
    if (task.userId !== decodedUser.userid) {
      throw new UnauthorizedException(
        taskResponseMessages.UNAUTHORIZED_TASK_DELETION,
      );
    }
    await this.taskRepository.remove(task);
    return new TaskResponseDto(
      true,
      taskResponseMessages.TASK_DELETED_SUCCESSFUL,
    );
  }
}
