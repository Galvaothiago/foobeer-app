import { ConflictException, HttpException, HttpStatus } from '@nestjs/common';

export class CategoryExistsException extends ConflictException {
  constructor() {
    super('Categoty already exists');
  }
}
