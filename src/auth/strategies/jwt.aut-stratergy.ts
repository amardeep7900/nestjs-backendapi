import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { Model } from 'mongoose';
import { users } from '../interfaces/auth.interfaces';
import { Jwtpayload } from '../payload.interface';
@Injectable()
export class jwtstrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel('users') private authmodel: Model<users>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'thisismykickasssecretthatiwilltotallychangelater',
    });
  }
  async validate(payload: Jwtpayload) {
    const { username } = payload;
    const user = await this.authmodel.findOne({ username });
    if (!user) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
