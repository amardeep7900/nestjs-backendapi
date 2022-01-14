import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { user, usermodel } from './schemas/user.model';


@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([{ name: user.name, schema: usermodel }]),
  ],
  exports: [UserService],
})
export class UserModule {}
