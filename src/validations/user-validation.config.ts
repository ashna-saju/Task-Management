/**
 * Object to store user-related configuration constants and messages
 * Constants and Messages:
 *   - `NAME_REQUIRED_MESSAGE`: Message indicating that a name is required for user registration.
 *   - `NAME_MIN_LENGTH`: Minimum length allowed for a user's name is 3.
 *   - `USERNAME_REQUIRED_MESSAGE`: Message indicating that a username is required for user registration.
 *   - `USERNAME_MIN_LENGTH`: Minimum length allowed for a user's username is 5.
 *   - `EMAIL_REQUIRED_MESSAGE`: Message indicating that an email is required for user registration.
 *   - `EMAIL_INVALID_MESSAGE`: Message indicating that the provided email is invalid.
 *   - `PASSWORD_REQUIRED_MESSAGE`: Message indicating that a password is required for user registration.
 *   - `PASSWORD_REGEX_MESSAGE`: Message indicating the password requirements for user registration.
 */
export const userConfig = {
  NAME_REQUIRED_MESSAGE: 'The name is required',
  NAME_MIN_LENGTH: 3,
  USERNAME_REQUIRED_MESSAGE: 'The username is required',
  USERNAME_MIN_LENGTH: 5,
  EMAIL_REQUIRED_MESSAGE: 'The email is required',
  EMAIL_INVALID_MESSAGE: 'Email should be in valid format',
  PASSWORD_REQUIRED_MESSAGE: 'The password is required',
  PASSWORD_REGEX_MESSAGE:'Password must contain at least one number, one letter, one special character, and be at least 8 characters long',
};
