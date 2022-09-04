import { HttpException, HttpStatus } from '@nestjs/common';

export class ProductExistsException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.CONFLICT);
  }
}
