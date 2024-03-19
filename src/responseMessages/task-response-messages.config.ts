/**
 * Object to store task-related response messages
 * Messages:
 *   - `TASK_NOT_FOUND`: Indicates that a task was not found
 *   - `UNAUTHORIZED_TASK_DELETION`: Indicates that the user is not authorized to delete a task
 *   - `TASK_DELETED_SUCCESSFUL`: Indicates that a task was successfully deleted
 *   - `TASK_CREATED_SUCCESSFUL`: Indicates that a task was successfully created
 *   - `NO_TASKS_FOUND`: Indicates that no tasks were found for the user
 *   - `TASK_UPDATE_UNAUTHORIZED`: Indicates that the user is not authorized to update a task
 *   - `TASK_UPDATED_SUCCESSFUL`: Indicates that a task was successfully updated
 */
export const taskResponseMessages = {
  TASK_NOT_FOUND: 'Task not found.',
  UNAUTHORIZED_TASK_DELETION: 'You are not authorized to delete this task.',
  TASK_DELETED_SUCCESSFUL: 'Task deleted successfully.',
  TASK_CREATED_SUCCESSFUL: 'Task created successfully.',
  NO_TASKS_FOUND: 'No tasks found for the user.',
  TASK_UPDATE_UNAUTHORIZED: 'You are not authorized to update this task.',
  TASK_UPDATED_SUCCESSFUL: 'Task updated successfully.',
  INVALID_OR_MISSING_TOKEN_MESSAGE: 'Invalid or missing token',
};
