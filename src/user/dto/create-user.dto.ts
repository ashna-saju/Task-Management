import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator'
import {
  NAME_REQUIRED_MESSAGE,
  NAME_MIN_LENGTH,
  USERNAME_REQUIRED_MESSAGE,
  USERNAME_MIN_LENGTH,
  EMAIL_REQUIRED_MESSAGE,
  EMAIL_INVALID_MESSAGE,
  PASSWORD_REQUIRED_MESSAGE,
  PASSWORD_REGEX_MESSAGE,
} from '../../validations/user-validation.constants';

/**
 * CreateUserDto
 * This DTO class represents the data transfer object for creating a new user.
 * It includes fields for username, email, and password.
 */
export class CreateUserDto {
  id: string;
  /**
   * The name of the user.
   * @IsNotEmpty The name is required.
   * @minLength 3 The name must be at least 3 characters long.
   */
  @IsNotEmpty({ message: NAME_REQUIRED_MESSAGE })
  @MinLength(NAME_MIN_LENGTH, { message: `The name must be at least ${NAME_MIN_LENGTH} characters long` })
  @IsString()
  name: string;
  /**
   * The username of the user.
   * @IsNotEmpty The username is required.
   * @minLength 5 The username must be at least 5 characters long.
   */
  @IsNotEmpty({ message: USERNAME_REQUIRED_MESSAGE })
  @MinLength(USERNAME_MIN_LENGTH, { message: `The username must be at least ${USERNAME_MIN_LENGTH} characters long` })
  @IsString()
  username: string;

  /**
   * The email address of the user.
   * @IsNotEmpty The email is required.
   * @isEmail The email must be a valid email address.
   */
  @IsNotEmpty({ message: EMAIL_REQUIRED_MESSAGE })
  @IsEmail({}, { message: EMAIL_INVALID_MESSAGE })
  email: string;

  /**
   * The password of the user.
   * @IsNotEmpty The password is required.
   */
  @Matches(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/, {
    message: PASSWORD_REGEX_MESSAGE,
  })
  @IsNotEmpty({ message: PASSWORD_REQUIRED_MESSAGE })
  @IsString()
  password: string;
}
