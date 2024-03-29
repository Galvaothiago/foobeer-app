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

  @Column({ name: 'avatar_path' })
  avatarPath: string;

  @Column({ name: 'barroom_cnpj' })
  barroomCNPJ: string;

  @Column({ type: 'enum', enum: Role, default: Role.TABLE })
  roles: Role[];

  @Column()
  password: string;
}
