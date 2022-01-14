import {Field,Int,InputType} from '@nestjs/graphql';

@InputType()
export class personinput{

  @Field()
readonly name:string;

@Field(()=>Int)
readonly age:number;

@Field()
readonly title:string;

@Field()
readonly description:string;
}

