import { Injectable } from '@nestjs/common';
import { BarroomService } from 'src/services/barroom.service';

import * as bcrypt from 'bcrypt';
import { BarRoom } from 'src/entities/barroom/barroom.entity';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedError } from './exceptions/unauthorized.exception';
import { UserService } from 'src/services/user.service';
import { User } from 'src/entities/user/user.entity';
import { Role } from 'src/entities/user/roles-enum';

interface PayloadProp {
  sub: string;
  username: string;
  email: string;
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

    console.log(user);
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
