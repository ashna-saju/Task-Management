/**
 * ViewUserResponseDto
 * This DTO represents the response data transfer object for retrieving user details.
 * It includes fields for user ID, name, username, email, and password.
 * Constructs a new ViewUserResponseDto object.
 * @param id The unique identifier of the user.
 * @param name The name of the user.
 * @param username The username of the user.
 * @param email The email address of the user.
 * @param password The password of the user.
 */
export class ViewUserResponseDto {
  id: string
  name: string
  username: string
  email: string
  password: string

  constructor(
    id: string,
    name: string,
    username: string,
    email: string,
    password: string
  ) {
    this.id = id
    this.name = name
    this.username = username
    this.email = email
    this.password = password
  }
}

