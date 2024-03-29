import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarroomController } from 'src/controllers/bar-room.controller';
import { OpeningHoursController } from 'src/controllers/opening-hours.controller';
import { BarRoom } from 'src/entities/bar-room/bar-room.entity';
import { OpeningHours } from 'src/entities/openinig-hours/opening-hours.entity';
import { BarroomService } from 'src/services/bar-room.service';
import { OpeningHoursService } from 'src/services/opening-hours.service';

@Module({
  imports: [TypeOrmModule.forFeature([OpeningHours])],
  controllers: [OpeningHoursController],
  providers: [OpeningHoursService],
})
export class OpeningHoursModule {}
