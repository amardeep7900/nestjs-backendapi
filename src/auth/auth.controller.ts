import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authcredtionalsdto } from './dto/auth-credtianls.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}
  @Post('signup')
  async signup(@Body() Authcredtionalsdto: authcredtionalsdto): Promise<any> {
    return await this.authservice.signup(Authcredtionalsdto);
  }
  @UseGuards(AuthGuard('local'))
  @Post('signin')
  async signIn(
    @Body() authcredtionalsdto: authcredtionalsdto,
  ): Promise<{ accessToken: string }> {
    return this.authservice.signIn(authcredtionalsdto);
  }
}
