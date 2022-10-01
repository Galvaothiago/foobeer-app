import { IsNotEmpty } from 'class-validator';

export class ResponseOrder {
  @IsNotEmpty()
  tableId: string;
  @IsNotEmpty()
  tableClientId: string;
}
