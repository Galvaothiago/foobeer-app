import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../category/category.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Category, (category) => category.name)
  category: Category;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { length: 1000 })
  description: string;

  @Column({ unique: true })
  code: string;

  @Column({ default: true })
  available: boolean;

  @Column({ type: 'float' })
  price: number;

  @Column({ name: 'bar_room_id' })
  barRoomId: string;
}
