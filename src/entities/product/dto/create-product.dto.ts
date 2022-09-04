import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  available: boolean;

  @IsNotEmpty()
  price: number;

  @IsOptional()
  barRoomCNPJ: string;
}
