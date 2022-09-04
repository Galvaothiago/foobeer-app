import { InternalServerErrorException } from '@nestjs/common';

export class CategoryException extends InternalServerErrorException {
  constructor(message: string) {
    super(message);
  }
}
