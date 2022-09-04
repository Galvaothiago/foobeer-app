import { Controller } from '@nestjs/common';
import { ProductService } from 'src/services/product.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductService) {}
}
