import { HttpException, HttpStatus } from '@nestjs/common';

export class CategoryNotFoundException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
