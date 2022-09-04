import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category/category.entity';
import { CreateCategoryDto } from 'src/entities/category/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/entities/category/dto/update-barroom.dto';
import { CategoryExistsException } from 'src/exceptions/category/category-exists.exception';
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

  async create(createCategoryDto: CreateCategoryDto) {
    createCategoryDto.name = capitalize(createCategoryDto.name);

    try {
      const categoryExists = await this.existsCategoryByName(createCategoryDto);

      if (categoryExists) {
        throw new CategoryExistsException();
      }

      const category = await this.categoryRepository.save(createCategoryDto);

      return category;
    } catch (error) {
      if (error instanceof CategoryExistsException) {
        throw error;
      }
      throw new CategoryException(error.message);
    }
  }

  async existsCategoryByName(
    createCategoryDto: CreateCategoryDto,
  ): Promise<boolean> {
    try {
      const category = await this.categoryRepository.findOne({
        where: {
          ...createCategoryDto,
        },
      });

      return !!category;
    } catch (err) {
      throw new CategoryException(err.message);
    }
  }

  async findCategoryByName(
    name: string,
    barroomCNPJ: string,
  ): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOne({
        where: {
          name,
          barroomCNPJ,
        },
      });

      if (!category) {
        throw new CategoryNotFoundException('Category not found');
      }

      return category;
    } catch (error) {
      if (error instanceof CategoryNotFoundException) {
        throw new CategoryNotFoundException(error.message);
      }
      throw new CategoryException(error.message);
    }
  }

  async getAllCategoriesByBarroom(barroomCNPJ: string): Promise<Category[]> {
    try {
      const categories = await this.categoryRepository.find({
        select: {
          name: true,
        },
        where: {
          barroomCNPJ,
        },
      });

      return categories;
    } catch (err) {
      throw new CategoryException(err.message);
    }
  }

  async deleteCategoryById(id: string, barroomCNPJ: string): Promise<void> {
    try {
      await this.categoryRepository.delete({
        id,
        barroomCNPJ,
      });
    } catch (err) {
      throw new CategoryException(err.message);
    }
  }

  async updateCategoryById(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.categoryRepository.findOne({
        where: {
          id,
        },
      });

      if (!category) {
        throw new CategoryNotFoundException('Category not found');
      }

      await this.categoryRepository.update(id, {
        ...updateCategoryDto,
      });
    } catch (err) {
      throw new CategoryException(err.message);
    }
  }
}
