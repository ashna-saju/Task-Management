import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { jwtConstants } from './contants'
import { Request } from 'express'
import { config } from '../config/messages/config'

/**
 * Guard to check the authentication of requests.
 */
@Injectable()

/**
 * method to determine if the incoming request is authorized by verifying the JWT token.
 * If the token is valid, the user payload is attached to the request object.
 * If the token is missing or invalid, an UnauthorizedException is thrown.
 * @param context The ExecutionContext object containing information about the current request context.
 * @returns A Promise<boolean> indicating whether the request is authorized.
 * @throws UnauthorizedException If the JWT token is missing or invalid.
 */
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if (!token) {
      throw new UnauthorizedException()
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      })
      if (!payload || !payload.name || !payload.email) {
        throw new UnauthorizedException(config.ERROR_INVALID_TOKEN_PAYLOAD)
      }
      request['user'] = payload
    } catch {
      throw new UnauthorizedException()
    }
    return true
  }

  /**
   * Extracts the JWT token from the request header.
   * @param request The request object.
   * @returns The JWT token extracted from the request header, or undefined if not found.
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}

