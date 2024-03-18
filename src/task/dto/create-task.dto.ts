import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  MinLength,
  MaxLength,
  IsEnum,
  IsUUID,
} from 'class-validator'
import { COMPLETION_STATUS_REQUIRED_MESSAGE, DESCRIPTION_MAX_LENGTH, DESCRIPTION_MIN_LENGTH, DESCRIPTION_REQUIRED_MESSAGE, DUE_DATE_REQUIRED_MESSAGE, INVALID_PRIORITY_MESSAGE, PRIORITY_REQUIRED_MESSAGE, TITLE_MAX_LENGTH, TITLE_MIN_LENGTH, TITLE_REQUIRED_MESSAGE } from 'src/validations/task-validation.constants';


/**
 * Enum representing the priority of a task.
 */
enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
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
  @MinLength(TITLE_MIN_LENGTH, { message: `The title must contain at least ${TITLE_MIN_LENGTH} characters` })
  @MaxLength(TITLE_MAX_LENGTH, { message: `The title must not exceed ${TITLE_MAX_LENGTH} characters` })
  @IsNotEmpty({ message: TITLE_REQUIRED_MESSAGE })
  title: string;
  
  /**
   * The description of the task.
   * @minimumLength 20 - The description must contain at least 20 characters.
   * @maximumLength 150 - The description must contain maximum 150 characters.
   */
  @IsString()
  @MinLength(DESCRIPTION_MIN_LENGTH, { message: `The description must contain at least ${DESCRIPTION_MIN_LENGTH} characters` })
  @MaxLength(DESCRIPTION_MAX_LENGTH, { message: `The description must not exceed ${DESCRIPTION_MAX_LENGTH} characters` })
  @IsNotEmpty({ message: DESCRIPTION_REQUIRED_MESSAGE })
  description: string;

  /**
   * The priority of the task.
   * @enum {Priority} - Must be one of the values defined in the Priority enum.
   */
  @IsEnum(Priority, { message: INVALID_PRIORITY_MESSAGE })
  @IsNotEmpty({ message: PRIORITY_REQUIRED_MESSAGE })
  priority: Priority;

  /**
   * The due date of the task.
   * @isDate - Must be a valid date.
   */
  @IsNotEmpty({ message: DUE_DATE_REQUIRED_MESSAGE })
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
  @IsNotEmpty({ message: COMPLETION_STATUS_REQUIRED_MESSAGE })
  completed: boolean;

}
