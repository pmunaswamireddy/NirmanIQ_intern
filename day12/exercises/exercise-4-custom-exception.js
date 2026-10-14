// Day 12 - Exercise 4: Custom Exceptions and Error Schema
// Author: Penumuru Madhu Sudhan Reddy

class AppException extends Error {
  constructor(message,statusCode=400,error='AppException') {
    super(message);
    this.statusCode=statusCode;
    this.error=error;
  }
}

class ProjectNotFoundException extends AppException {
  constructor(id) {
    super(`Project with ID ${id} was not found`,404,'NotFoundException');
  }
}

function handleException(err,reqPath) {
  const status=err.statusCode||500;
  const message=err.message||'Internal server error';
  const error=err.error||'InternalServerError';

  return {
    statusCode:status,
    message,
    error,
    timestamp:new Date().toISOString(),
    path:reqPath
  };
}

try {
  throw new ProjectNotFoundException('proj-999');
} catch(e) {
  const formatted=handleException(e,'/projects/proj-999');
  console.log('Formatted response:',formatted);
}
