import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { userConfig } from '../../validations/user-validation.config';

/**
 * CreateUserDto
 * This DTO class represents the data transfer object for creating a new user.
 * It includes fields for name, username, email, and password.
 */
export class CreateUserDto {
  id: string;

  /**
   * The name of the user.
   * @IsNotEmpty The name is required.
   * @minLength 3 The name must be at least 3 characters long.
   */
  @IsNotEmpty({ message: userConfig.NAME_REQUIRED_MESSAGE })
  @MinLength(userConfig.NAME_MIN_LENGTH, {
    message: `The name must be at least ${userConfig.NAME_MIN_LENGTH} characters long`,
  })
  @IsString()
  name: string;

  /**
   * The username of the user.
   * @IsNotEmpty The username is required.
   * @minLength 5 The username must be at least 5 characters long.
   */
  @IsNotEmpty({ message: userConfig.USERNAME_REQUIRED_MESSAGE })
  @MinLength(userConfig.USERNAME_MIN_LENGTH, {
    message: `The username must be at least ${userConfig.USERNAME_MIN_LENGTH} characters long`,
  })
  @IsString()
  username: string;

  /**
   * The email address of the user.
   * @IsNotEmpty The email is required.
   * @isEmail The email must be a valid email address.
   */
  @IsNotEmpty({ message: userConfig.EMAIL_REQUIRED_MESSAGE })
  @IsEmail({}, { message: userConfig.EMAIL_INVALID_MESSAGE })
  email: string;

  /**
   * The password of the user.
   * @IsNotEmpty The password is required.
   * @Matches /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/ The password must contain at least one number, one letter, one special character, and be at least 8 characters long.
   */
  @Matches(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/, {
    message: userConfig.PASSWORD_REGEX_MESSAGE,
  })
  @IsNotEmpty({ message: userConfig.PASSWORD_REQUIRED_MESSAGE })
  @IsString()
  password: string;
}
