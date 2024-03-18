import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from './auth.guard'
import { AuthService } from './auth.service'

/**
 * authController
 * This controller handles HTTP requests related to authorization, which includes:
   - login.
   - view user profile.
 */
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //API URL: POST:/auth/login
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
  signIn(@Body() signInDto: { username: string; password: string }) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  //API URL: GET:/task-management/auth/view-profile
  /**
   * Function to retrieve the user profile.
   * add the access token in the bearer token section.
   * @returns The user object from the request.
   */
  // @UseGuards(AuthGuard)
  // @Get('me')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
  @UseGuards(AuthGuard)
  @Get('me')
  async getProfile(@Request() req) {
    const decodedToken = await this.authService.decodeToken(req.headers.authorization.split(' ')[1]);
    // Assuming decodedToken contains user information like id, username, name, email
    const { id, username, name, email } = decodedToken;
    return {id, username, name, email };
  }
}
