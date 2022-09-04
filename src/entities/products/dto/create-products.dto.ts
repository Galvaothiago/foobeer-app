import { IsNotEmpty } from 'class-validator';

export class CreateProductsDto {
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

  @IsNotEmpty()
  barRoomId: string;
}
