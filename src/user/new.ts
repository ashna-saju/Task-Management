// //API URL: GET:/users/id/:id
//   //Retrieves a user by their id
//   // Protected by the AuthGuard and user decorator, which ensures that only authenticated users can view the user details by id
//   //a. The function takes a parameter 'id' , which specifies the id of the user to be retrieved.
//   //b. Then it calls the function 'findUserById' to retrieve the user details from the database.
//   //c. If a user with the id is not found, then it throws a 'NotFoundException' with an error message 'User not found'.
//   //d. If a user is found, then it returns the id, name, username, email.
//   /**
//    * This function retrieves a user by their id.
//    * @param id The username of the user to be retrieved.
//    * @returns A promise resolving to returning the id, name, username, email if found.
//    * @throws NotFoundException if the user with the specified id is not found.
//    */
// @UseGuards(AuthGuard)
//   @Get('id/:id')
//   async findUserById(@User() user: Users,@Param('id') id: string): Promise<Users> {
//     return this.userService.findUserById(id);
//   }

// // API URL: PATCH:/users
// // Updates a user's profile information
// // Protected by the AuthGuard and user decorator, which ensures that only authenticated users can update their profile
// // a. The function takes parameters 'updateUserDto', 'req', 'id'.
// // b. It calls the 'updateUser' function in the user service, passing the extracted token, id, and updated user details.
// // d. The 'updateUser' function retrieves the user by id, updates their profile information with the provided DTO, and saves the changes to the database.
// // e. Upon successful update, it returns a success response with the message 'User details updated successfully'.

// /**
//  * Updates a user's profile information.
//  * @param user The authenticated user object.
//  * @body updateUserDto The DTO containing the updated user information.
//  * @param req The HTTP request object.
//  * @param id The id of the user to be updated.
//  * @returns A promise resolving to a UserResponseDto indicating the success of the update operation.
//  */
//   @UseGuards(AuthGuard)
//   @Patch()
//   async updateUser(
//     @User() user: Users,
//     @Body() updateUserDto: Partial<Users>,
//     @Request() req,
//     id:string 
//   ): Promise<UserResponseDto> {
//     id = req.user.id;
//     const token = req.headers.authorization.replace('Bearer ', '');
//     return this.userService.updateUser( token,id, updateUserDto);
//   }
  
// // API URL: DELETE:/users
// // Deletes a user's account
// // Protected by the AuthGuard and user decorator, which ensures that only authenticated users can delete their account
// // a. The function takes parameters 'req', 'id'.
// // b. It calls the 'deleteUser' function in the user service, passing the extracted token and id.
// // c. The 'deleteUser' function in the service retrieves the user by id and removes their account from the database.
// // d. Upon successful deletion, it returns a success response with the message 'User deleted successfully'.

// /**
//  * Deletes a user's account.
//  * @param user The authenticated user object.
//  * @param req The HTTP request object.
//  * @param id The id of the user to be deleted.
//  * @returns A promise resolving to a UserResponseDto indicating the success of the delete operation.
//  */

//   @UseGuards(AuthGuard)
//   @Delete()
//   async deleteUser(@User() user: Users,@Request() req, id: string): Promise<UserResponseDto> {
//     id = req.user.id;
//     const token = req.headers.authorization.replace('Bearer ', '');
//     return this.userService.deleteUser(token, id);
//   }





// /**
//    * findUserById
//    * Retrieves a user by their Id.
//    * @param id The id of the user to be retrieved.
//    * @returns A promise resolving to returning the id, name, username, email if found.
//    * @throws NotFoundException if the user with the specified id is not found.
//    */
//   async findUserById(id: string): Promise<Users> {
//     const user = await this.userRepository.findOne({
//       where: { id },
//       select: ['id', 'username', 'email', 'name'],
//     });
//     if (!user) {
//       throw new NotFoundException(config.USER_NOT_FOUND);
//     }
//     return user;
//   }

//   /**
//  * Updates a user's profile information.
//  * @param user The authenticated user object.
//  * @body updateUserDto The DTO containing the updated user information.
//  * @param req The HTTP request object.
//  * @param id The id of the user to be updated.
//  * @returns A promise resolving to a UserResponseDto indicating the success of the update operation.
//  */
//   async updateUser(
//     token:string,
//     id: string,
//     updateUserDto: Partial<CreateUserDto>,
//   ): Promise<UserResponseDto> {
//     const user = await this.findUserById(id);
//     Object.assign(user, updateUserDto);
//     await this.userRepository.save(user);
//     return new UserResponseDto(true, config.DETAILS_UPDATED_SUCCESSFUL);
//   }

//   async deleteUser(token:string,id: string): Promise<UserResponseDto> {
//     const user = await this.findUserById(id);
//     await this.userRepository.remove(user);
//     return new UserResponseDto(true, config.USER_DELETED_SUCCESSFUL);
//   }