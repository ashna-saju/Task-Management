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
   - view user profile.
 */
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  //API URL: POST:/task-management/auth/login
  //Create user details
  //Request body shall contain
  //1.id: integer mandatory not empty
  //2.password:string mandatory not empty
  /**
   * Function to handle user login.
   * @param signInDto An object containing user ID and password.
   * @returns A promise resolving to an object containing an access token.
   */
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: { id: number; password: string }) {
    return this.authService.signIn(signInDto.id, signInDto.password);
  }
  //API URL: GET:/task-management/auth/view-profile
  /**
   * Function to retrieve the user profile.
   * add the access token in the bearer token section.
   * @returns The user object from the request.
   */
  @UseGuards(AuthGuard)
  @Get('view-profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
