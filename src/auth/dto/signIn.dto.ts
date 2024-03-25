import { IsNotEmpty, IsString } from 'class-validator'
import { config } from '../../config/messages/config'

/**
 * Data Transfer Object for handling sign-in requests.
 */
export class SignInDto {
  @IsNotEmpty({ message: config.USERNAME_REQUIRED_MESSAGE })
  @IsString()
  username: string
  @IsNotEmpty({ message: config.PASSWORD_REQUIRED_MESSAGE })
  @IsString()
  password: string
}
