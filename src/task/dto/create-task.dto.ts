import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  MinLength,
  MaxLength,
  IsEnum,
} from 'class-validator';
import { config } from 'src/config/messages/config';

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

  @IsString()
  @MinLength(config.TITLE_MIN_LENGTH, {
    message: `The title must contain at least ${config.TITLE_MIN_LENGTH} characters`,
  })
  @MaxLength(config.TITLE_MAX_LENGTH, {
    message: `The title must not exceed ${config.TITLE_MAX_LENGTH} characters`,
  })
  @IsNotEmpty({ message: config.TITLE_REQUIRED_MESSAGE })
  title: string;

  @IsString()
  @MinLength(config.DESCRIPTION_MIN_LENGTH, {
    message: `The description must contain at least ${config.DESCRIPTION_MIN_LENGTH} characters`,
  })
  @MaxLength(config.DESCRIPTION_MAX_LENGTH, {
    message: `The description must not exceed ${config.DESCRIPTION_MAX_LENGTH} characters`,
  })
  @IsNotEmpty({ message: config.DESCRIPTION_REQUIRED_MESSAGE })
  description: string;

  @IsEnum(Priority, { message: config.INVALID_PRIORITY_MESSAGE })
  @IsNotEmpty({ message: config.PRIORITY_REQUIRED_MESSAGE })
  priority: Priority;

  @IsNotEmpty({ message: config.DUE_DATE_REQUIRED_MESSAGE })
  dueDate: Date;

  userId: string;

  @IsBoolean()
  @IsNotEmpty({ message: config.COMPLETION_STATUS_REQUIRED_MESSAGE })
  completed: boolean;
}
