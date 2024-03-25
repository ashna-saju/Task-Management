import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { decodePassword } from '../utils/bcrypt.utils'
import { UserService } from '../user/user.service'
import { config } from '../config/messages/config'
@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  /**
   * Function to authenticate a user based on provided credentials
   * @body username
   * @body password
   * Check if the user exists and the password matches
   * @returns A promise resolving to an object containing an access token
   * @throws UnauthorizedException if authentication fails
   */
  async signIn(
    username: string,
    password: string
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findUserByUsername(username)
    if (user && decodePassword(password, user.password) === true) {
      const payload = {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email
      }
      const access_token = await this.jwtService.signAsync(payload)
      return { access_token }
    } else {
      throw new UnauthorizedException(config.ERROR_INVALID_CREDENTIALS)
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
      const decoded = this.jwtService.decode(token)
      return decoded
    } catch (error) {
      throw new UnauthorizedException(config.ERROR_INVALID_TOKEN)
    }
  }
}
