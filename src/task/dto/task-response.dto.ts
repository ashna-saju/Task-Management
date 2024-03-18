import { Tasks } from "src/entities/task.entity"
export class TaskResponseDto<T> {
    success: boolean;
    message: string;
    task?: Tasks;
    constructor(success: boolean, message: string, task?: Tasks) {
      this.success = success;
      this.message = message;
      this.task = task;
    }
  }
  