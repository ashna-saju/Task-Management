import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignInDto } from './dto/signIn.dto'
import { UserService } from 'src/user/user.service'

/**
 * AuthController
 * This controller handles HTTP requests related to authorization, which includes:
   - login.
   - view profile.
 */
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  //API URL: POST:/auth
  //Login using user details
  //Request body shall contain
  //1.username: string mandatory not empty
  //2.password:string mandatory not empty
  /**
   * Function to handle user login.
   * @body signInDto An object containing username and password.
   * @returns A promise resolving to an object containing an access token.
   */
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    const { username, password } = signInDto
    return this.authService.signIn(username, password)
  }
}
