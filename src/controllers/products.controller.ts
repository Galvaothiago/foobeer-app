import { Body, Controller, Get, Post } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { CreateProductDto } from 'src/entities/product/dto/create-product.dto';
import { User } from 'src/entities/user/user.entity';
import { ProductService } from 'src/services/product.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductService) {}

  @Post()
  async createProduct(
    @CurrentUser() user: User,
    @Body() createProductDto: CreateProductDto,
  ) {
    createProductDto = {
      ...createProductDto,
      barRoomCNPJ: user.barroomCNPJ,
    };

    return await this.productsService.createProduct(createProductDto);
  }

  @Get()
  async getProductByCategory(
    @CurrentUser() user: User,
    @Body() createProductDto: CreateProductDto,
  ) {
    const categoryInfo = {
      name: createProductDto.category,
      barroomCNPJ: user.barroomCNPJ,
    };
    return await this.productsService.findProducstByCategory(categoryInfo);
  }

  @Get()
  async getProductByName(@Body() createProductDto: CreateProductDto) {
    const name = createProductDto.name;
    const barRoomId = createProductDto.barRoomCNPJ;

    return await this.productsService.findProductByName(name, barRoomId);
  }
}
