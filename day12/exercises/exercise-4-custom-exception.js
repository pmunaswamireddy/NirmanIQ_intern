// Day 12 - Exercise 4: Custom Exceptions and Unified Error Schema
// Demonstrates consistent 5-field API error response formatting

class AppException extends Error {
  constructor(message, statusCode = 400, errorName = 'AppException') {
    super(message);
    this.statusCode = statusCode;
    this.errorName = errorName;
  }
}

class ProjectNotFoundException extends AppException {
  constructor(id) {
    super(`Project with ID '${id}' was not found`, 404, 'NotFoundException');
  }
}

function formatErrorResponse(exception, requestPath) {
  const statusCode = exception.statusCode || 500;
  const message = exception.message || 'Internal server error';
  const error = exception.errorName || 'InternalServerError';

  return {
    statusCode,
    message,
    error,
    timestamp: new Date().toISOString(),
    path: requestPath
  };
}

console.log('--- EXERCISE 4: UNIFIED EXCEPTION FILTER FORMAT ---');

try {
  throw new ProjectNotFoundException('proj-999');
} catch (err) {
  const formattedResponse = formatErrorResponse(err, '/projects/proj-999');
  console.log('Formatted Error Response:');
  console.log(JSON.stringify(formattedResponse, null, 2));
}
