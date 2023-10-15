/**
 * Custom error class for validation errors.
 * @class ErrorException
 * @extends Error
 */
export class ErrorException extends Error {
  /**
   * Creates an instance of ValidationError.
   * @param {Object} errors - The validation errors object.
   * @param {string} name - The name of the error.
   */
  constructor({ message, name = "ValidationError" }) {
    super(message);
    this.name = name;
    this.message = message;
    this.stack = this.stack.split("\n")[1].trim();
    // option 2: stack.match(/(?<=\().+?(?=\))/g)[0]
  }
}

/**
 * Creates an instance of ValidationError.
 * @param {Object} errors - The validation errors object.
 * @param {string} name - The name of the error.
 */

export const newError = ({ errors, name = "ValidationError", status = 400 }) => ({
  name,
  message: errors,
  status,
  stack: new Error().stack.split("\n")[1].trim(),
});



