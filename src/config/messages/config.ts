/**
 * Object to store validation messages and response messages
 */
export const config = {
  NAME_REQUIRED_MESSAGE: 'The name is required',
  NAME_MIN_LENGTH: 3,
  USERNAME_REQUIRED_MESSAGE: 'The username is required',
  USERNAME_MIN_LENGTH: 5,
  EMAIL_REQUIRED_MESSAGE: 'The email is required',
  EMAIL_INVALID_MESSAGE: 'Email should be in valid format',
  PASSWORD_REQUIRED_MESSAGE: 'The password is required',
  PASSWORD_REGEX_MESSAGE:
    'Password must contain at least one number, one letter, one special character, and be at least 8 characters long',
  TITLE_REQUIRED_MESSAGE: 'Title is required',
  TITLE_MIN_LENGTH: 5,
  TITLE_MAX_LENGTH: 20,
  DESCRIPTION_REQUIRED_MESSAGE: 'Description is required',
  DESCRIPTION_MIN_LENGTH: 20,
  DESCRIPTION_MAX_LENGTH: 150,
  PRIORITY_REQUIRED_MESSAGE: 'Priority is required',
  INVALID_PRIORITY_MESSAGE: 'Invalid priority',
  DUE_DATE_REQUIRED_MESSAGE: 'Due date is required',
  COMPLETION_STATUS_REQUIRED_MESSAGE: 'Completion status is required',
  REGISTRATION_SUCCESSFUL: 'User registration successful.',
  DETAILS_UPDATED_SUCCESSFUL: 'User details updated successfully.',
  USER_DELETED_SUCCESSFUL: 'User deleted successfully.',
  EMAIL_ALREADY_EXISTS: 'User with the provided email already exists.',
  USERNAME_ALREADY_EXISTS: 'User with the provided username already exists.',
  USER_NOT_FOUND: 'User not found.',
  TASK_NOT_FOUND: 'Task not found.',
  UNAUTHORIZED_TASK_DELETION: 'You are not authorized to delete this task.',
  TASK_DELETED_SUCCESSFUL: 'Task deleted successfully.',
  TASK_CREATED_SUCCESSFUL: 'Task created successfully.',
  NO_TASKS_FOUND: 'No tasks found for the user.',
  TASK_UPDATE_UNAUTHORIZED: 'You are not authorized to update this task.',
  TASK_UPDATED_SUCCESSFUL: 'Task updated successfully.',
  INVALID_OR_MISSING_TOKEN_MESSAGE: 'Invalid or missing token',
  ERROR_INVALID_TOKEN: 'Invalid token',
  ERROR_INVALID_CREDENTIALS: 'Invalid credentials',
  ERROR_INVALID_TOKEN_PAYLOAD: 'Invalid token payload'
}

