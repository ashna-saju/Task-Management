/**
 * Object to store task-related configuration constants and messages
 * Constants and Messages:
 *   - `TITLE_REQUIRED_MESSAGE`: Message indicating that a title is required for a task.
 *   - `TITLE_MIN_LENGTH`: Minimum length allowed for a task title is 5.
 *   - `TITLE_MAX_LENGTH`: Maximum length allowed for a task title is 20.
 *   - `DESCRIPTION_REQUIRED_MESSAGE`: Message indicating that a description is required for a task.
 *   - `DESCRIPTION_MIN_LENGTH`: Minimum length allowed for a task description is 20.
 *   - `DESCRIPTION_MAX_LENGTH`: Maximum length allowed for a task description is 150.
 *   - `PRIORITY_REQUIRED_MESSAGE`: Message indicating that a priority is required for a task.
 *   - `INVALID_PRIORITY_MESSAGE`: Message indicating that the provided priority is invalid.
 *   - `DUE_DATE_REQUIRED_MESSAGE`: Message indicating that a due date is required for a task.
 *   - `COMPLETION_STATUS_REQUIRED_MESSAGE`: Message indicating that a completion status is required for a task.
 */
export const taskConfig = {
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
};
