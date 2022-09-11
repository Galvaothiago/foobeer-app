import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarTableController } from 'src/controllers/bar-table.controller';
import { BarTable } from 'src/entities/bar-table/bar-table.entity';
import { BarTableService } from 'src/services/bar-table.service';

@Module({
  imports: [TypeOrmModule.forFeature([BarTable])],
  controllers: [BarTableController],
  providers: [BarTableService],
  exports: [BarTableService],
})
export class BarTableModule {}
