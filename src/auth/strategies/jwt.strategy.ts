import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Role } from 'src/entities/user/roles-enum';

interface UserFromJwt {
  id: string;
  username: string;
  email: string;
  barroomCNPJ: string;
  roles: Role[];
}

interface PayloadProp {
  sub: string;
  username: string;
  email: string;
  barroomCNPJ: string;
  roles: Role[];
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: PayloadProp): Promise<UserFromJwt> {
    return {
      id: payload.sub,
      username: payload.username,
      email: payload.email,
      barroomCNPJ: payload.barroomCNPJ,
      roles: payload.roles,
    };
  }
}
