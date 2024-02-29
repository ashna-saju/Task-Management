// import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { JwtModule } from '@nestjs/jwt';
// import { AuthController } from './auth.controller';
// import { jwtConstants } from './contants';
// import { UserModule } from 'src/user/user.module';
// import { User } from 'src/user/user.entity';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserService } from 'src/user/services/user.service';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([User]),
//     UserModule,
//     JwtModule.register({
//       global: true,
//       secret: jwtConstants.secret,
//       signOptions: { expiresIn: '60s' },
//     }),
//   ],
//   providers: [AuthService,UserService],
//   controllers: [AuthController],
//   exports: [AuthService],
  
// })
// export class AuthModule {}


import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './contants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/services/user.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService,UserService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}