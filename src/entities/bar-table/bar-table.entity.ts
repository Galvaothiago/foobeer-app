import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bar_table')
export class BarTable {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  number: number;

  @Column({ name: 'barroom_cnpj' })
  barroomCNPJ: string;

  @Column()
  status: string;

  @Column({ name: 'open_at' })
  openAt: Date;

  @Column({ name: 'close_at' })
  closeAt: Date;

  @Column({ name: 'peopĺe_at_the_table' })
  peopleAtTheTable: number;

  @Column({ name: 'people_connected' })
  peopleConnected: number;

  @Column({ name: 'total_value' })
  totalValue: number;
}
