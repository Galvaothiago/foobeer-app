import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { BarRoom } from '../barroom/barroom.entity';
import { WeekDaysEnum } from './week-days.enum';

@Entity('opening_hours')
export class OpeningHours {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn()
  barroomId: string;

  @Column({
    type: 'enum',
    enum: WeekDaysEnum,
  })
  weekDays: string;

  @Column()
  openAt: string;

  @Column()
  closeAt: string;
}
