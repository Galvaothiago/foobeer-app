import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bar_room')
export class BarRoom {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'logo_path' })
  logoPath: string;

  @Column({ unique: true })
  cnpj: string;
}
