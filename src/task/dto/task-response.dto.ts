/**
 * Data transfer object for task-related operations.
 * Contains information about the success status, a message describing the result, and an optional task object.
 * @param success Indicates whether the operation was successful.
 * @param message Message providing information about the operation.
 */
export class TaskResponseDto {
  success: boolean
  message: string
  constructor(success: boolean, message: string) {
    this.success = success
    this.message = message
  }
}

