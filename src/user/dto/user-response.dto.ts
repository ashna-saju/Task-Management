import { Users } from "src/entities/user.entity";
export class UserResponseDto {
    success: boolean;
    message: string;
    user?: Users;
    constructor(success: boolean, message: string
      , user?: Users) {
      this.success = success;
      this.message = message;
      this.user = user;
    }
  }
  