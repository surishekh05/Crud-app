class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;

    // Maintain proper stack trace (only in development)
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorResponse;