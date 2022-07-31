import { Entity } from 'typeorm';

@Entity('bar_room')
export class BarRoom {
  name: string;

  address: string;

  email: string;

  cnpj: string;
}
