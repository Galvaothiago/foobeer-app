import { IsNotEmpty } from 'class-validator';
import { BarRoom } from 'src/entities/barroom/barroom.entity';

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
