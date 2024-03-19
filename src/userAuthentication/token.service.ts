import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
export class TokenService {
  constructor(private authService: AuthService) {}

  /**
 * getUserIdFromToken
 * Retrieves the userid from the provided authentication token.
 * @param token The authentication token from which to extract the userid.
 * @throws UnauthorizedException if the provided token is invalid or does not contain a userid.
 * @returns A promise that resolves to a string representing the userid extracted from the token.
 */
  async getUserIdFromToken(token: string): Promise<string> {
    const decodedUser = await this.authService.decodeToken(token);
    if (!decodedUser || !decodedUser.userid) {
      throw new UnauthorizedException('Invalid token');
    }
    return decodedUser.userid;
  }
}
