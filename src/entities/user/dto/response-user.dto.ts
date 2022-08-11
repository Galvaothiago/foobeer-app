import { Role } from '../roles-enum';

export class UserResponse {
  id: string;
  username: string;
  email: string;
  yourPowers: string;
  avatarPath: string;
  barroomCNPJ: string;
  roles: Role[];
}
