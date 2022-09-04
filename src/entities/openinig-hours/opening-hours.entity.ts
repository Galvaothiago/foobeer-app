import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { WeekDaysEnum } from './week-days.enum';

@Entity('opening_hours')
export class OpeningHours {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'bar_room_id' })
  @PrimaryColumn()
  barroomId: string;

  @Column({
    name: 'week_days',
    type: 'enum',
    enum: WeekDaysEnum,
  })
  weekDays: string;

  @Column({ name: 'open_at' })
  @Column()
  openAt: string;

  @Column({ name: 'close_at' })
  closeAt: string;
}
