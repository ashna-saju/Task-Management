import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
  /**
   * getHello
   * This method returns a greeting message, 'Hello World!'.
   * @returns {string} A greeting message.
   */
  getHello(): string {
    return 'Hello World!';
  }
}
