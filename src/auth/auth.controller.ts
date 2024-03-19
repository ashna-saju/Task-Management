import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

/**
 * authController
 * This controller handles HTTP requests related to authorization, which includes:
   - login.
   - view profile.
 */
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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
  signIn(@Body() signInDto: { username: string; password: string }) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  //API URL: GET:/auth
  /**
   * Function to retrieve the user profile.
   * add the access token in the bearer token section.
   * @returns The user object from the request.
   */
  @UseGuards(AuthGuard)
  @Get()
  async getProfile(@Request() req) {
    const decodedToken = await this.authService.decodeToken(
      req.headers.authorization.split(' ')[1],
    );
    const { id, username, name, email } = decodedToken;
    return { id, username, name, email };
  }
}
