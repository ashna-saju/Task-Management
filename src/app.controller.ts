import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
@Controller()
export class AppController {
  /**
   * getHello
   * This method is responsible for handling HTTP GET requests to the root endpoint of the application.
   * However, it currently throws an error indicating that the method is not implemented.
   * It should be implemented to return a response containing a greeting or any other relevant data.
   * @returns {any} An error indicating that the method is not implemented.
   */
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly appService: AppService) {}
}
