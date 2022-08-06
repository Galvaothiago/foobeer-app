import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { IsPasswordValid } from 'src/decorators/password-validator.decorator';
import { Role } from '../roles-enum';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(4)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  roles: Role[];

  @IsNotEmpty()
  password: string;
}
