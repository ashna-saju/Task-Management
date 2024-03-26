import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { AuthService } from '../auth/auth.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Task } from '../entities/task.entity'
import { TaskResponseDto } from './dto/task-response.dto'
import { Repository } from 'typeorm'
import { config } from '../config/messages/config'
@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private authService: AuthService
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
    createTaskDto: CreateTaskDto
  ): Promise<TaskResponseDto> {
    const decodedUser = await this.authService.decodeToken(token)
    if (!decodedUser || !decodedUser.id) {
      throw new UnauthorizedException(config.INVALID_OR_MISSING_TOKEN_MESSAGE)
    }
    const userId = decodedUser.id
    createTaskDto.userId = userId
    createTaskDto.title = createTaskDto.title.trim()
    createTaskDto.description = createTaskDto.description.trim()
    const newTask = this.taskRepository.create({ ...createTaskDto })
    await this.taskRepository.save(newTask)
    return new TaskResponseDto(true, config.TASK_CREATED_SUCCESSFUL)
  }

  /**
   * Retrieves tasks by user id.
   * @param {number} userId - The id of the user.
   * @returns {Promise<Task[]>} Array of tasks belonging to the user.
   * @throws {NotFoundException} Task not found.
   */
  async getTasksByUserId(userId: string): Promise<Task[]> {
    const tasks = await this.taskRepository.find({ where: { userId } })
    if (!tasks || tasks.length === 0) {
      throw new NotFoundException(config.NO_TASKS_FOUND)
    }
    return tasks
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
    id: number,
    updateTaskDto: Partial<Task>
  ): Promise<TaskResponseDto> {
    const task = await this.taskRepository.findOne({ where: { id } })
    const decodedUser = await this.authService.decodeToken(token)
    if (!decodedUser || !decodedUser.id) {
      throw new UnauthorizedException(config.INVALID_OR_MISSING_TOKEN_MESSAGE)
    }
    const userId = decodedUser.id
    if (!task) {
      throw new NotFoundException(config.TASK_NOT_FOUND)
    }
    if (task.userId !== userId) {
      throw new UnauthorizedException(config.TASK_UPDATE_UNAUTHORIZED)
    }
    Object.assign(task, updateTaskDto)
    await this.taskRepository.save(task)
    return new TaskResponseDto(true, config.TASK_UPDATED_SUCCESSFUL)
  }

  /**
   * Deletes a task by its id.
   * @param {string} token - The JWT token.
   * @param {string} id - The id of the task to delete.
   * @returns {Promise<TaskResponseDto>} A Promise representing the completion of the task deletion.
   * @throws {NotFoundException} Task not found.
   * @throws {UnauthorizedException} You are not authorized to delete this task.
   */
  async deleteTask(token: string, id: number): Promise<TaskResponseDto> {
    const task = await this.taskRepository.findOne({ where: { id } })
    const decodedUser = await this.authService.decodeToken(token)
    if (!decodedUser || !decodedUser.id) {
      throw new UnauthorizedException(config.INVALID_OR_MISSING_TOKEN_MESSAGE)
    }
    if (!task) {
      throw new NotFoundException(config.TASK_NOT_FOUND)
    }
    if (task.userId !== decodedUser.id) {
      throw new UnauthorizedException(config.UNAUTHORIZED_TASK_DELETION)
    }
    await this.taskRepository.remove(task)
    return new TaskResponseDto(true, config.TASK_DELETED_SUCCESSFUL)
  }
}
