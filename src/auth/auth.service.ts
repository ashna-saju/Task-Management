import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../user/user.service'
import { decodePassword } from 'src/utils/bcrypt.utils';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  /**
   * Function to authenticate a user based on provided credentials.
   * @body username
   * @body password -The user password.
   * @returns A promise resolving to an object containing an access token.
   * @throws UnauthorizedException if authentication fails.
   */
  // async signIn(
  //   username: string,
  //   password: string,
  // ): Promise<{ access_token: string }> {
  //   const user = await this.usersService.findUserByUsername(username);
  //   if (user?.password !== password) {
  //     throw new UnauthorizedException();
  //   }
  //   const payload = { id: user.id, username: user.username };
  //   return {
  //     access_token: await this.jwtService.signAsync(payload)
  //   };
  // }

  async signIn(username: string, password: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findUserByUsername(username);
    console.log(password)
    console.log(user.password)
    // Check if the user exists and the password matches
    if (user && decodePassword(password,user.password)===true) {
      // Include additional fields in the payload
      const payload = {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,        
      };

      // Sign the token with the payload
      const access_token = await this.jwtService.signAsync(payload);
      // Return the access token
      return { access_token };
    } else {
      // Throw UnauthorizedException if authentication fails
      throw new UnauthorizedException('Invalid credentials');
    }
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
      console.log(decoded)
      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
