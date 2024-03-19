import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  MinLength,
  MaxLength,
  IsEnum,
} from 'class-validator';
import { taskConfig } from '../../validations/task-validation.config';

/**
 * Enum representing the priority of a task.
 */
enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

/**
 * Data Transfer Object (DTO) for creating a new task.
 */
export class CreateTaskDto {
  id: string;

  /**
   * The title of the task.
   * @minimumLength 5 - The title must contain at least 5 characters.
   * @maximumLength 20 - The title must contain maximum 20 characters.
   */
  @IsString()
  @MinLength(taskConfig.TITLE_MIN_LENGTH, {
    message: `The title must contain at least ${taskConfig.TITLE_MIN_LENGTH} characters`,
  })
  @MaxLength(taskConfig.TITLE_MAX_LENGTH, {
    message: `The title must not exceed ${taskConfig.TITLE_MAX_LENGTH} characters`,
  })
  @IsNotEmpty({ message: taskConfig.TITLE_REQUIRED_MESSAGE })
  title: string;

  /**
   * The description of the task.
   * @minimumLength 20 - The description must contain at least 20 characters.
   * @maximumLength 150 - The description must contain maximum 150 characters.
   */
  @IsString()
  @MinLength(taskConfig.DESCRIPTION_MIN_LENGTH, {
    message: `The description must contain at least ${taskConfig.DESCRIPTION_MIN_LENGTH} characters`,
  })
  @MaxLength(taskConfig.DESCRIPTION_MAX_LENGTH, {
    message: `The description must not exceed ${taskConfig.DESCRIPTION_MAX_LENGTH} characters`,
  })
  @IsNotEmpty({ message: taskConfig.DESCRIPTION_REQUIRED_MESSAGE })
  description: string;

  /**
   * The priority of the task.
   * @enum {Priority} - Must be one of the values defined in the Priority enum.
   */
  @IsEnum(Priority, { message: taskConfig.INVALID_PRIORITY_MESSAGE })
  @IsNotEmpty({ message: taskConfig.PRIORITY_REQUIRED_MESSAGE })
  priority: Priority;

  /**
   * The due date of the task.
   * @isDate - Must be a valid date.
   */
  @IsNotEmpty({ message: taskConfig.DUE_DATE_REQUIRED_MESSAGE })
  dueDate: Date;

  /**
   * The ID of the user associated with the task.
   * @type {string}
   * @isUUID - Must be a valid UUID.
   */
  userId: string;

  /**
   * The completion status of the task.
   * @isBoolean - Must be a boolean value.
   */
  @IsBoolean()
  @IsNotEmpty({ message: taskConfig.COMPLETION_STATUS_REQUIRED_MESSAGE })
  completed: boolean;
}
