import { Tasks } from 'src/entities/task.entity';
/**
   * Data transfer object for task-related operations.
   * Contains information about the success status, a message describing the result, and an optional task object.
   * @param success Indicates whether the operation was successful.
   * @param message Message providing information about the operation.
   * @param task An optional task object associated with the response, returned when creating tasks.
   */
export class TaskResponseDto {
  success: boolean;
  message: string;
  task?: Tasks;
  constructor(success: boolean, message: string, task?: Tasks) {
    this.success = success;
    this.message = message;
    this.task = task;
  }
}
