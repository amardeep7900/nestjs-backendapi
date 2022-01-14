import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
export class authcredtionalsdto {
  @MinLength(6)
  @IsString()
  @IsEmail()
  username: string;

  @MinLength(8, { message: 'password is too short (8 character min)' })
  @MaxLength(15, { message: 'password is too long (20 charcter max)' })
  password: string;
}
