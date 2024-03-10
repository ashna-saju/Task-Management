import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/services/user.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}
  /**
   * Function to authenticate a user based on provided credentials.
   * @param id The user ID.
   * @param pass The user password.
   * @returns A promise resolving to an object containing an access token.
   * @throws UnauthorizedException if authentication fails.
   */
  async signIn(id: number, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findUserById(id);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  /**
   * Function to decode a JWT token.
   * @param token The JWT token to decode.
   * @returns Decoded token payload.
   * @throws UnauthorizedException if token is invalid.
   */
  async decodeToken(token: string): Promise<any> {
    try {
      const decoded = this.jwtService.decode(token);
      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
