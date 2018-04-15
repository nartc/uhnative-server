import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { Component } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { get } from 'config';
import { JwtPayloadInterface } from '../models/jwt-payload';
import { use } from 'passport';

@Component()
export class JwtStrategy extends Strategy {
  constructor(private readonly _authService: AuthService) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
        secretOrKey: process.env.JWT_SECRET || get('jwt.secret'),
      },
      async (req, payload, next) => await this.verify(req, payload, next),
    );
    use(this);
  }

  public async verify(req, payload: JwtPayloadInterface, done: VerifiedCallback) {
    const isValid = await this._authService.validateUser(payload);
    if (!isValid) {
      return done('Unauthorized from Strategy', false);
    }

    return done(null, payload.user);
  }
}