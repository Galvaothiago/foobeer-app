import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarroomController } from 'src/controllers/barroom.controller';
import { BarRoom } from 'src/entities/barroom/barroom.entity';
import { BarroomService } from 'src/services/barroom.service';

@Module({
  imports: [TypeOrmModule.forFeature([BarRoom])],
  controllers: [BarroomController],
  providers: [BarroomService],
  exports: [BarroomService],
})
export class BarroomModule {}
