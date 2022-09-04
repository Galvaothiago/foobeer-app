import { HttpException, HttpStatus } from '@nestjs/common';

export class BarRoomExistsException extends HttpException {
  constructor() {
    super('Barroom already exists using this email', HttpStatus.CONFLICT);
  }
}
