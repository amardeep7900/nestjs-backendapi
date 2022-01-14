import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document  } from 'mongoose';

export type userdocument = user & Document;
@Schema()
export class user {


  
  @Prop({ required: true })
  @Prop()
  uuid: string;
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  status: boolean;

  
}

export const usermodel = SchemaFactory.createForClass(user);
