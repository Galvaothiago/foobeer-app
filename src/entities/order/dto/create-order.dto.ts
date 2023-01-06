import { IsNotEmpty, IsOptional } from 'class-validator';
import { Product } from 'src/entities/product/product.entity';

export class CreateOrderDto {
  @IsNotEmpty()
  tableId: string;
  @IsNotEmpty()
  tableClientId: string;

  @IsNotEmpty()
  product: Product;

  @IsOptional()
  note: string;

  @IsNotEmpty()
  quantity: number;
}
