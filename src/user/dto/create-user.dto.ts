import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
/**
 * CreateUserDto
 * This DTO class represents the data transfer object for creating a new user.
 * It includes fields for username, email, and password.
 */
export class CreateUserDto {
  id?: number;
  /**
   * The username of the user.
   * @IsNotEmpty The username is required.
   * @minLength 5 The username must be at least 5 characters long.
   */
  @IsNotEmpty({ message: 'The username is required' })
  @MinLength(5, { message: 'The username must be at least 5 characters long' })
  @IsString()
  username: string;
  /**
   * The email address of the user.
   * @IsNotEmpty The email is required.
   * @isEmail The email must be a valid email address.
   */
  @IsNotEmpty({ message: 'The email is required' })
  @IsEmail()
  email: string;
  /**
   * The password of the user.
   * @IsNotEmpty The password is required.
   */
  @IsNotEmpty({ message: 'The password is required' })
  @IsString()
  password: string;
}
