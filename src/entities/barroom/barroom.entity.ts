import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OpeningHours } from '../openinig-hours/opening-hours.entity';

@Entity('bar_room')
export class BarRoom {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column()
  logoPath: string;

  @Column()
  cnpj: string;

  @Column()
  password: string;
}
