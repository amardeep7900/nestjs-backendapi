import { Field, ID, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class persondto {
  @Field()
  readonly name: string;

  @Field(() => ID)
  readonly id?: string;

  @Field()
  readonly description: string;

  @Field(() => Int)
  readonly age: number;

  @Field()
  readonly title: string;
}
