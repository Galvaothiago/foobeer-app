import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarroomController } from 'src/controllers/bar-room.controller';
import { BarRoom } from 'src/entities/bar-room/bar-room.entity';
import { BarroomService } from 'src/services/bar-room.service';

@Module({
  imports: [TypeOrmModule.forFeature([BarRoom])],
  controllers: [BarroomController],
  providers: [BarroomService],
  exports: [BarroomService],
})
export class BarroomModule {}
