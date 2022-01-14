import { userdto } from "./user.dto";
import { IsEmail,IsNotEmpty } from "class-validator";
export class createuserdto extends userdto{
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}