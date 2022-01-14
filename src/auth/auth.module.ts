import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { authschema } from './schema/auth.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtstrategy } from './strategies/jwt.aut-stratergy';
import { localstartegy } from './strategies/local.strategies';


@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: 'users', schema: authschema }]),
    JwtModule.register({
      secret: 'thisismykickasssecretthatiwilltotallychangelater',
      signOptions: { expiresIn: '48h' },
    }),
  ],
  providers: [AuthService, localstartegy, jwtstrategy],
  controllers: [AuthController],
  exports: [AuthService, PassportModule, jwtstrategy],
})
export class AuthModule {}
