import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  code: string;

  available: boolean;

  @IsNotEmpty()
  price: number;

  barRoomCNPJ: string;
}
