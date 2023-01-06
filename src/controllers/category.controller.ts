import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { CreateCategoryDto } from 'src/entities/category/dto/create-category.dto';
import { User } from 'src/entities/user/user.entity';
import { CategoryExistsException } from 'src/exceptions/category/category-exists.exception';
import { CategoryNotFoundException } from 'src/exceptions/category/category-not-found.exception';
import { HttpExceptionFilter } from 'src/exceptions/http-exception.filter';
import { CategoryService } from 'src/services/category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(
    @CurrentUser() user: User,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    createCategoryDto = {
      ...createCategoryDto,
      barroomCNPJ: user.barroomCNPJ,
    };

    return await this.categoryService.create(createCategoryDto);
  }

  @Get()
  async getCategoriesByBarRoom(@CurrentUser() user: User) {
    return await this.categoryService.getAllCategoriesByBarroom(
      user.barroomCNPJ,
    );
  }
}
