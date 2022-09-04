import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarroomController } from 'src/controllers/barroom.controller';
import { CategoryController } from 'src/controllers/category.controller';
import { BarRoom } from 'src/entities/barroom/barroom.entity';
import { Category } from 'src/entities/category/category.entity';
import { BarroomService } from 'src/services/barroom.service';
import { CategoryService } from 'src/services/category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
