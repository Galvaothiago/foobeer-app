import { InternalServerErrorException } from '@nestjs/common';

export class ProductException extends InternalServerErrorException {
  constructor(message: string) {
    super(message);
  }
}
