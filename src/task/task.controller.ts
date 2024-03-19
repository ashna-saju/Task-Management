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
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { Tasks } from '../entities/task.entity';
import { TaskService } from './task.service';

/**
 * taskController
 * This controller handles HTTP requests related to task management, which includes:
   - Create a new task.
   - Retrieve tasks of a user using userid.
   - update tasks using task id.
   - delete tasks using task id.
 */
@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  //API URL-POST:/tasks
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
  //the system shall return an error message 'The title must not exceed 20 characters'
  //d.If the task description provided is not atleast 20 character of length , then
  //the system shall return an error message 'The description must contain at least 20 characters'
  //e.If the task description provided is more than 150 character of length , then
  //the system shall return an error message 'The description must not exceed 150 characters'
  //f.If the task priority provided is not from the list {low,medium,high} , then
  //the system shall return an error message 'Invalid priority'
  //d.If the above validation is passed, then
  //1. The system shall save the task details to the DB
  //2. System shall return the success status,message and the task
  /**
   * Function create the task details
   * @param req The request object containing the authorization token in the headers.
   * @body createTaskDto The DTO containing the parameters for creating the task.
   * @returns {Promise<TaskResponseDto>} A Promise containing the response object for the created task.
   */
  @UseGuards(AuthGuard)
  @Post()
  async createTask(@Request() req, @Body() createTaskDto: CreateTaskDto) {
    const token = req.headers.authorization.replace('Bearer ', '');
    return this.taskService.createTask(token, createTaskDto);
  }

  //API URL: GET:/tasks
  //Retrieves tasks by their user id
  // Protected by the AuthGuard, which ensures that only authenticated users can retrieve the task
  //a. The function takes a parameter 'id' by decoding the token , which specifies the userId of the user to be retrieved.
  //b. Then it calls the function 'getTasksByUserId' to retrieve the tasks from the database.
  //c. If a task with the userId is not found, then it throws a 'NotFoundException' with an error message 'Task not found'.
  //d. If a Task is found, then it returns the task object.
  /**
   * This function retrieves a task by their user id.
   * @param req The request object containing user authentication details.
   * @returns A Promise resolving to an array of tasks associated with the user's id.
   */
  @UseGuards(AuthGuard)
  @Get()
  async getTasksByUserId(@Request() req) {
    const user = req.user;
    return this.taskService.getTasksByUserId(user.userId);
  }

  //API URL: UPDATE:/tasks/:id
  //Update task by their task id
  // Protected by the AuthGuard, which ensures that only authenticated users can update the task
  //a. The function takes a parameter 'id' , which specifies the task id of the task to be updated.
  //b. Then it calls the function 'updateTask' to update the tasks from the database.
  //c. If a valid token is not found in the bearer token section, then it throws a 'UnauthorizedException' with an error message 'Invalid or missing token'.
  //d. If a task with the task id is not found, then it throws a 'NotFoundException' with an error message 'Task not found'.
  //e. If the userid of the task to be updated does not match with the userid decoded from the token, then it throws a 'UnauthorizedException' with an error message 'You are not authorized to update this task'.
  //f. If a Task is updated, then it returns the message 'Task updated successfully' and the updated task object.
  /**
   * This function updates a task by their task Id.
   * @param  token - The JWT token.
   * @param id - The id of the task to update.
   * @param  updateTaskDto - The data to update the task.
   * @returns {Promise<TaskResponseDto>} A Promise containing a success message and the updated task.
   */
  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateTask(
    @Request() req,
    @Param('id') id: string,
    @Body() updateTaskDto: Partial<Tasks>,
  ) {
    const token = req.headers.authorization.replace('Bearer ', '');
    return this.taskService.updateTask(token, id, updateTaskDto);
  }

  //API URL: DELETE:/tasks/:id
  //delete task by their task id
  // Protected by the AuthGuard, which ensures that only authenticated users can delete the task
  //a. The function takes a parameter 'id' , which specifies the task Id of the task to be deleted.
  //b. Then it calls the function 'deleteTask' to delete the tasks from the database.
  //c. If a valid token is not found in the bearer token section, then it throws a 'UnauthorizedException' with an error message 'Invalid or missing token'.
  //d. If a task with the task Id is not found, then it throws a 'NotFoundException' with an error message 'Task not found'.
  //e. If the userId of the task to be deleted does not match with the userId decoded from the token, then it throws a 'UnauthorizedException' with an error message 'You are not authorized to delete this task'.
  //f. If a Task is deleted, then it returns the message 'Task deleted successfully'.
  /**
   * Deletes a task by its ID.
   * @param req - The request object.
   * @param id - The id of the task to delete.
   * @returns {Promise<void>} A Promise representing the completion of the task deletion.
   */
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteTask(@Request() req, @Param('id') id: string) {
    const token = req.headers.authorization.replace('Bearer ', '');
    return this.taskService.deleteTask(token, id);
  }
}
