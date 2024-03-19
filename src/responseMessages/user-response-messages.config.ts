/**
 * Object to store user-related response messages
 * Messages:
 *   - `REGISTRATION_SUCCESSFUL`: Indicates that user registration was successful
 *   - `DETAILS_UPDATED_SUCCESSFUL`: Indicates that user details were successfully updated
 *   - `USER_DELETED_SUCCESSFUL`: Indicates that a user was successfully deleted
 *   - `EMAIL_ALREADY_EXISTS`: Indicates that a user with the provided email already exists
 *   - `USERNAME_ALREADY_EXISTS`: Indicates that a user with the provided username already exists
 *   - `USER_NOT_FOUND`: Indicates that the requested user was not found
 */
export const userResponseMessages = {
  REGISTRATION_SUCCESSFUL: 'User registration successful.',
  DETAILS_UPDATED_SUCCESSFUL: 'User details updated successfully.',
  USER_DELETED_SUCCESSFUL: 'User deleted successfully.',
  EMAIL_ALREADY_EXISTS: 'User with the provided email already exists.',
  USERNAME_ALREADY_EXISTS: 'User with the provided username already exists.',
  USER_NOT_FOUND: 'User not found.',
};
