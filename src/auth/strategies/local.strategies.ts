import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
@Injectable()
export class localstartegy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
  async validate(username: string): Promise<any> {
    const user = await this.authService.validateuser({username});
    if (!user) {
      throw new UnauthorizedException('Invalid credtianls');
    }
    return user;
  }
}
