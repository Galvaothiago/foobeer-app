import { Injectable } from '@nestjs/common';
import { BarroomService } from 'src/services/bar-room.service';

import * as bcrypt from 'bcrypt';
import { BarRoom } from 'src/entities/bar-room/bar-room.entity';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedError } from './exceptions/unauthorized.exception';
import { UserService } from 'src/services/user.service';
import { User } from 'src/entities/user/user.entity';
import { Role } from 'src/entities/user/roles-enum';

interface PayloadProp {
  sub: string;
  username: string;
  email: string;
  barroomCNPJ: string;
  roles: Role[];
}

export interface LoginResponse {
  accessToken: string;
  id: string;
  username: string;
  email: string;
  roles: Role[];
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUsernameAndPassword(username: string, password: string) {
    const user = await this.userService.findByUsernameAuth(username);

    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (isValidPassword) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    throw new UnauthorizedError();
  }

  login(user: User): LoginResponse {
    const payload: PayloadProp = {
      sub: user.id,
      username: user.username,
      email: user.email,
      barroomCNPJ: user.barroomCNPJ,
      roles: user.roles,
    };

    const jwt = this.jwtService.sign(payload);

    return {
      id: user.id,
      accessToken: jwt,
      username: user.username,
      email: user.email,
      roles: user.roles,
    };
  }
}
