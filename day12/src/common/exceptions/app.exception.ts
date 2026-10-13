import { HttpException, HttpStatus } from '@nestjs/common';

export class AppException extends HttpException {
  constructor(message: string, statusCode: HttpStatus = HttpStatus.BAD_REQUEST, errorName = 'AppException') {
    super({ statusCode, message, error: errorName }, statusCode);
  }
}

export class ProjectNotFoundException extends AppException {
  constructor(id: string) {
    super(`Project with ID ${id} was not found`, HttpStatus.NOT_FOUND, 'NotFoundException');
  }
}
