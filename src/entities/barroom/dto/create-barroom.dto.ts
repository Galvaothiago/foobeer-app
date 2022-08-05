import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateBarroomDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  address: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  cnpj: string;

  @IsNotEmpty()
  logoPath: string;

  @IsNotEmpty()
  password: string;
}
