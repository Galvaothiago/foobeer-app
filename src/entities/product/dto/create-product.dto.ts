import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  SKU: string;

  available: boolean;

  @IsNotEmpty()
  price: number;

  barRoomId: string;
}
