import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from 'src/entities/category/dto/create-category.dto';
import { CreateProductDto } from 'src/entities/product/dto/create-product.dto';
import { Product } from 'src/entities/product/product.entity';
import { ProductExistsException } from 'src/exceptions/product/product-exists.exception';
import { ProductNotFoundException } from 'src/exceptions/product/product-not-found.exception';
import { ProductException } from 'src/exceptions/product/product.exception';
import { CategoryService } from 'src/services/category.service';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly categoryService: CategoryService,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    try {
      const productExists = await this.productsRepository.findOne({
        where: {
          name: createProductDto.name,
        },
      });

      if (productExists) {
        throw new ProductExistsException('Product already exists');
      }

      const category = await this.categoryService.findCategoryByName(
        createProductDto.category,
        createProductDto.barRoomCNPJ,
      );

      const productWithCategory = {
        ...createProductDto,
        category,
      };

      return await this.productsRepository.save(productWithCategory);
    } catch (error) {
      if (error instanceof ProductExistsException) {
        throw error;
      }
      throw new ProductException(error.message);
    }
  }

  async findProductByName(name: string, barRoomCNPJ: string) {
    try {
      const product = await this.productsRepository.findOne({
        where: {
          name,
          barRoomCNPJ,
        },
      });

      return product;
    } catch (err) {
      throw new ProductException(err.message);
    }
  }

  async findProductByCode(code: string) {
    try {
      const product = await this.productsRepository.findOne({
        where: {
          code,
        },
      });

      if (!product) {
        throw new ProductNotFoundException('Product not found');
      }

      return product;
    } catch (error) {
      if (error instanceof ProductNotFoundException) {
        throw error;
      }
      throw new ProductException(error.message);
    }
  }

  async findProducstByCategory(category: CreateCategoryDto) {
    try {
      const products = await this.productsRepository.find({
        where: {
          category: category,
        },
      });

      return products;
    } catch (err) {
      throw new ProductException(err.message);
    }
  }
}