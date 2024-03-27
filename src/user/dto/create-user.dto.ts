import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength
} from 'class-validator'
import { config } from '../../config/messages/config'

/**
 * CreateUserDto
 * This DTO class represents the data transfer object for creating a new user.
 * There is a static method to trim whitespace from name and username fields,
 * and convert the email field to lowercase for a given CreateUserDto object.
 * @param createUserDto The CreateUserDto object to be modified.
 * @returns The modified CreateUserDto object with trimmed and lowercase fields.
 */
export class CreateUserDto {
  id: string

  @IsNotEmpty({ message: config.NAME_REQUIRED_MESSAGE })
  @MinLength(config.NAME_MIN_LENGTH, {
    message: `The name must be at least ${config.NAME_MIN_LENGTH} characters long`
  })
  @IsString()
  name: string

  @IsNotEmpty({ message: config.USERNAME_REQUIRED_MESSAGE })
  @MinLength(config.USERNAME_MIN_LENGTH, {
    message: `The username must be at least ${config.USERNAME_MIN_LENGTH} characters long`
  })
  @IsString()
  username: string

  @IsNotEmpty({ message: config.EMAIL_REQUIRED_MESSAGE })
  @IsEmail({}, { message: config.EMAIL_INVALID_MESSAGE })
  email: string

  @Matches(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/, {
    message: config.PASSWORD_REGEX_MESSAGE
  })
  @IsNotEmpty({ message: config.PASSWORD_REQUIRED_MESSAGE })
  @IsString()
  password: string

  static trimUserFields(createUserDto: CreateUserDto): CreateUserDto {
    createUserDto.name = createUserDto.name.trim()
    createUserDto.username = createUserDto.username.trim()
    createUserDto.email = createUserDto.email.trim().toLowerCase()
    return createUserDto
  }
}


