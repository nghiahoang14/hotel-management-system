import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UsersService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/require-await
  async signIn(user: any): Promise<string> {
    const payload: JwtPayload = {
      sub: user._id,
      email: user.email,
      role: user.role,
    };

    return this.jwtService.sign(payload);
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.usersService.findOneByEmail(payload.email);
  }
}
