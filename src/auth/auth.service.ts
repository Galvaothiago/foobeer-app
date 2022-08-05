import { Injectable } from '@nestjs/common';
import { BarroomService } from 'src/services/barroom.service';

import * as bcrypt from 'bcrypt';
import { BarRoom } from 'src/entities/barroom/barroom.entity';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedError } from './exceptions/unauthorized.exception';

interface PayloadProp {
  sub: string;
  name: string;
  cnpj: string;
  email: string;
}

export interface LoginResponse {
  accessToken: string;
  id: string;
  name: string;
  cnpj: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly barroomService: BarroomService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUsernameAndPassword(email: string, password: string) {
    const barroom = await this.barroomService.findBarroomByEmail(email);

    if (barroom) {
      const isValidPassword = await bcrypt.compare(password, barroom.password);

      if (isValidPassword) {
        return {
          ...barroom,
          password: undefined,
        };
      }
    }

    throw new UnauthorizedError();
  }

  login(barroom: BarRoom): LoginResponse {
    const payload: PayloadProp = {
      sub: barroom.id,
      name: barroom.name,
      cnpj: barroom.cnpj,
      email: barroom.email,
    };

    const jwt = this.jwtService.sign(payload);

    return {
      id: barroom.id,
      accessToken: jwt,
      name: barroom.name,
      cnpj: barroom.cnpj,
      email: barroom.email,
    };
  }
}
