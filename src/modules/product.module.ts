import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from 'src/controllers/products.controller';
import { Product } from 'src/entities/product/product.entity';
import { ProductService } from 'src/services/product.service';
import { CategoryModule } from './category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CategoryModule],
  controllers: [ProductsController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
