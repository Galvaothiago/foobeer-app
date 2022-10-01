import { IsNotEmpty } from 'class-validator';
import { BarRoom } from 'src/entities/bar-room/bar-room.entity';

export class CreateOpeningHoursDto {
  @IsNotEmpty()
  barroomId: string;

  @IsNotEmpty()
  weekDays: string;

  @IsNotEmpty()
  openAt: string;

  @IsNotEmpty()
  closeAt: string;
}
