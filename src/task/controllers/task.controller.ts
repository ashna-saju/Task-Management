import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Task } from '../task.entity';
import { TaskService } from '../services/task.service';
import { AuthGuard } from '../../auth/auth.guard';
/**
 * taskController
 * This controller handles HTTP requests related to task management, which includes:
   - Create a new task.
   - Retrieve tasks of a user using user ID.
   - update tasks using task ID.
   - delete tasks using task ID.
 */
@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}
  //API URL-POST:/task-management/task/create-task
  //Create task details
  // Protected by the AuthGuard, which ensures that only authenticated users can create the task
  //Request body shall contain
  //1.title:string mandatory not empty min length - 3 and max length - 20
  //2.description:string mandatory not empty min length - 20 and max length - 150
  //3.priority:enum {low,medium,high} mandatory not empty
  //4.dueDate:date mandatory not empty
  //5.completed:boolean mandatory not empty
  //The system shall check the following:
  //a.If the mandatory field does not have any values, then
  //the system shall return an error message '<Field Name> is required'
  //b.If the task title provided is not atleast 5 character of length , then
  //the system shall return an error message 'The title must contain at least 5 characters'
  //c.If the task title provided is more than 20 character of length , then
  //the system shall return an error message 'The title must contain  maximum 20 characters'
  //d.If the task description provided is not atleast 20 character of length , then
  //the system shall return an error message 'The description must contain at least 20 characters'
  //e.If the task description provided is more than 150 character of length , then
  //the system shall return an error message 'The description must contain maximum 150 characters'
  //f.If the task priority provided is not from the list {low,medium,high} , then
  //the system shall return an error message 'Invalid priority'
  //d.If the above validation is passed, then
  //1. The system shall save the task details to the DB
  //2. System shall return the newly created task
  /**
   * Function create the task details
   * @body CreateTaskDto
   * @returns {Promise<Task>}
   * @memberof TaskController
   */
  @UseGuards(AuthGuard)
  @Post('create-task')
  createTask(
    @Request() req,
    @Body(new ValidationPipe()) createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    const token = req.headers.authorization.replace('Bearer ', '');
    return this.taskService.createTask(token, createTaskDto);
  }
  //API URL: GET:/task-management/task/view-task-by-userid/:id
  //Retrieves tasks by their user id
  // Protected by the AuthGuard, which ensures that only authenticated users can retrieve the task
  //a. The function takes a parameter 'id' , which specifies the userId of the user to be retrieved.
  //b. Then it calls the function 'getTasksByUserId' to retrieve the tasks from the database.
  //c. If a task with the userId is not found, then it throws a 'NotFoundException' with an error message 'Task not found'.
  //d. If a Task is found, then it returns the task object.
  /**
   * This function retrieves a task by their userId.
   * @param id
   * @returns {Promise<Task[]>}
   */
  @UseGuards(AuthGuard)
  @Get('view-task-by-userid/:userId')
  getTasksByUserId(@Param('userId') userId: number): Promise<Task[]> {
    return this.taskService.getTasksByUserId(userId);
  }
  //API URL: UPDATE:/task-management/task/update-task/:id
  //Update task by their task id
  // Protected by the AuthGuard, which ensures that only authenticated users can update the task
  //a. The function takes a parameter 'id' , which specifies the task Id of the task to be updated.
  //b. Then it calls the function 'updateTask' to update the tasks from the database.
  //c. If a valid token is not found in the bearer token section, then it throws a 'UnauthorizedException' with an error message 'Invalid or missing token'.
  //d. If a task with the task Id is not found, then it throws a 'NotFoundException' with an error message 'Task not found'.
  //e. If the userId of the task to be updated does not match with the userId decoded from the token, then it throws a 'UnauthorizedException' with an error message 'You are not authorized to update this task'.
  //f. If a Task is updated, then it returns the message 'Task updated successfully' and the updated task object.
  /**
   * This function updates a task by their task Id.
   * @param id
   * @returns {Promise<{ message: string; updatedTask: Task }>}
   */
  @UseGuards(AuthGuard)
  @Patch('update-task/:id')
  async updateTask(
    @Request() req,
    @Param('id') id: number,
    @Body(new ValidationPipe()) updateTaskDto: Partial<Task>,
  ): Promise<{ message: string; updatedTask: Task }> {
    const token = req.headers.authorization.replace('Bearer ', '');
    const { message, updatedTask } = await this.taskService.updateTask(
      token,
      id,
      updateTaskDto,
    );
    return { message, updatedTask };
  }
  //API URL: DELETE:/task-management/task/delete-task/:id
  //delete task by their task id
  // Protected by the AuthGuard, which ensures that only authenticated users can delete the task
  //a. The function takes a parameter 'id' , which specifies the task Id of the task to be deleted.
  //b. Then it calls the function 'deleteTask' to delete the tasks from the database.
  //c. If a valid token is not found in the bearer token section, then it throws a 'UnauthorizedException' with an error message 'Invalid or missing token'.
  //d. If a task with the task Id is not found, then it throws a 'NotFoundException' with an error message 'Task not found'.
  //e. If the userId of the task to be deleted does not match with the userId decoded from the token, then it throws a 'UnauthorizedException' with an error message 'You are not authorized to delete this task'.
  //f. If a Task is deleted, then it returns the message 'Task deleted successfully'.
  /**
   * This function delete a task by their task Id.
   * @param id
   * @returns {Promise<{ message: string }>}
   */
  @UseGuards(AuthGuard)
  @Delete('remove-task/:id')
  async deleteTask(
    @Request() req,
    @Param('id') id: number,
  ): Promise<{ message: string }> {
    const token = req.headers.authorization.replace('Bearer ', '');
    return await this.taskService.deleteTask(token, id);
  }
}
