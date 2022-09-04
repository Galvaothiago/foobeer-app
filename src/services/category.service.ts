import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category/category.entity';
import { CategoryNotFoundException } from 'src/exceptions/category/category-not-found.exception';
import { CategoryException } from 'src/exceptions/category/category.exception';
import { capitalize } from 'src/utils/format';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(name: string, barroomId: string) {
    name = capitalize(name);

    try {
      const categoryExists = await this.existsCategoryByName(name, barroomId);

      if (categoryExists) {
        throw new CategoryException('Category already exists');
      }

      const category = await this.categoryRepository.save({
        name,
        barroomId,
      });

      return category;
    } catch (err) {
      throw new CategoryException(err.message);
    }
  }

  async existsCategoryByName(
    name: string,
    barroomId: string,
  ): Promise<boolean> {
    try {
      const category = await this.categoryRepository.findOne({
        where: {
          name,
          barroomId,
        },
      });

      return !!category;
    } catch (err) {
      throw new CategoryException(err.message);
    }
  }

  async findCategoryByName(name: string, barroomId: string) {
    try {
      const category = await this.categoryRepository.findOne({
        where: {
          name,
          barroomId,
        },
      });

      if (!category) {
        throw new CategoryNotFoundException('Category not found');
      }

      return category;
    } catch (err) {
      throw new CategoryException(err.message);
    }
  }
}
