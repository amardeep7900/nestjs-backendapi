import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { users } from './interfaces/auth.interfaces';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { authcredtionalsdto } from './dto/auth-credtianls.dto';
import { JwtService } from '@nestjs/jwt';
import { Jwtpayload } from './payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('users') private authmodel: Model<users>,
    private jwtservice: JwtService,
  ) {}
  async signup(authcredtionalsdto: authcredtionalsdto): Promise<void> {
    const { username, password } = authcredtionalsdto;
    const hashedpassword = await bcrypt.hash(password, 10);
    const user = new this.authmodel({ username, password: hashedpassword });
    try {
      await user.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('user already exist');
      }
      throw error;
    }
  }
  async signIn(
    authcredtionalsdto: authcredtionalsdto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authcredtionalsdto;
    const user = await this.authmodel.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: Jwtpayload = { username };
      const accessToken: string = await this.jwtservice.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('please check your login credtianls');
    }
  }
  async validateuser(payload: Jwtpayload): Promise<users> {
    const { username } = payload;
    const user = await this.authmodel.findOne({ username });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
