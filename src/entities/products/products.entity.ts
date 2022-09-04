import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 100 })
  category: string;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { length: 1000 })
  description: string;

  @Column({ unique: true })
  SKU: string;

  @Column({ default: true })
  available: boolean;

  @Column({ type: 'float' })
  price: number;

  @Column({ name: 'bar_room_id' })
  barRoomId: string;
}
