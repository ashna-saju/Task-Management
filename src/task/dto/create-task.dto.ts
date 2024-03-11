import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  MinLength,
  MaxLength,
  IsEnum,
} from 'class-validator';
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
  id: number;
  /**
   * The title of the task.
   * @minimumLength 5 - The title must contain at least 5 characters.
   * @maximumLength 20 - The title must contain maximum 20 characters.
   */
  @IsString()
  @MinLength(5, { message: 'The title must contain at least 5 characters' })
  @MaxLength(20, { message: 'The title must contain  maximum 20 characters' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;
  /**
   * The description of the task.
   * @minimumLength 20 - The description must contain at least 20 characters.
   * @maximumLength 150 - The description must contain maximum 150 characters.
   */
  @IsString()
  @MinLength(20, {
    message: 'The description must contain at least 20 characters',
  })
  @MaxLength(150, {
    message: 'The description must contain maximum 150 characters',
  })
  @IsNotEmpty({ message: 'Description is required' })
  description: string;
  /**
   * The priority of the task.
   * @enum {Priority} - Must be one of the values defined in the Priority enum.
   */
  @IsEnum(Priority, { message: 'Invalid priority' })
  @IsNotEmpty({ message: 'Priority is required' })
  priority: Priority;
  /**
   * The due date of the task.
   * @isDate - Must be a valid date.
   */
  @IsNotEmpty({ message: 'Due date is required' })
  dueDate: Date;
  /**
   * The completion status of the task.
   * @isBoolean - Must be a boolean value.
   */
  @IsBoolean()
  @IsNotEmpty({ message: 'Completion status is required' })
  completed: boolean;
  /**
   * The ID of the user associated with the task.
   * @type {number}
   */
  userId: number;
}
