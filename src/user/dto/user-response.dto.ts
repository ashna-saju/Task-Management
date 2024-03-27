/**
 * Data transfer object for user response
 * @param success Indicates whether the operation was successful.
 * @param message Message providing information about the operation.
 */
export class UserResponseDto {
  success: boolean
  message: string
  constructor(success: boolean, message: string) {
    this.success = success
    this.message = message
  }
}

