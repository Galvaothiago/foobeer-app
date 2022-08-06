import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Role } from './roles-enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  yourPowers: string;

  @Column()
  roles: Role[];

  @Column()
  password: string;
}
