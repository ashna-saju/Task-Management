// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { UserService } from '../user/services/user.service';
// import { JwtService } from '@nestjs/jwt';
// import { User } from '../user/user.entity';
 
// @Injectable()
// export class AuthService {
//   constructor(
//     private userService: UserService,
//     private jwtService: JwtService,
//   ) {}
 
//   async signIn(
//     id: number,
//     password: string,
//   ): Promise<{ access_token: string }> {
//     const user = await this.userService.findUserById(id);
//     console.log("hi")
//     if (user?.password !== password) {
//       throw new UnauthorizedException();
//     }
//     const payload = { sub: user.id, username: user.username };
//     return {
//       access_token: await this.jwtService.signAsync(payload),
//     };
//   }
//   async getUserById(userId: number): Promise<User> {
//     return await this.userService.findUserById(userId);
//   }
//   async decodeToken(token: string): Promise<any> {
//     try {
//       const decoded = this.jwtService.decode(token);
//       return decoded;
//     } catch (error) {
//       throw new UnauthorizedException('Invalid token');
//     }}
 
// }

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/services/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(
    userId: number,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findUserById(userId);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async decodeToken(token: string): Promise<any> {
    try {
      const decoded = this.jwtService.decode(token);
      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}