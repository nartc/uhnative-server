import { Component } from '@nestjs/common';
import { sign, SignOptions } from 'jsonwebtoken';
import { UserService } from '../user/user.service';
import { get } from 'config';
import { JwtPayloadInterface } from './models/jwt-payload';

@Component()
export class AuthService {
  jwtOptions: SignOptions;
  jwtSecret: string;

  constructor(private readonly _userService: UserService) {
    this.jwtOptions = {
      expiresIn: '12h',
    };
    this.jwtSecret = process.env.JWT_SECRET || get('jwt.secret');
  }

  async signPayload(payload): Promise<string> {
    return sign(payload, this.jwtSecret, this.jwtOptions);
  }

  async validateUser(payload: JwtPayloadInterface): Promise<boolean> {
    const result = await this._userService.getById(payload.user._id);
    return !!result;
  }
}