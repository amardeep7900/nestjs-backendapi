import { Resolver } from '@nestjs/graphql';
import { PersonService } from './person.service';
import { Query, Args, Mutation } from '@nestjs/graphql';
import { persondto } from './dto/person.dto';
import { personinput } from './input/person.input';
import { person } from './interface/person.interface';

@Resolver()
export class PersonResolver {
  constructor(private personservice: PersonService) {}

  @Query(() => [persondto])
  async all(): Promise<persondto[]> {
    return this.personservice.findAll();
  }

  @Mutation(() => persondto)
  async create(@Args('input') input: personinput) {
    return await this.personservice.create(input);
  }
  @Query(() => persondto)
  async findOne(@Args('id') id: string) {
    return await this.personservice.findOne(id);
  }

  @Mutation(() => persondto)
  async delete(@Args('id') id: string) {
    return await this.personservice.delete(id);
  }

  @Mutation(() => persondto)
  async update(@Args('input') input: personinput, @Args('id') id: string) {
    return await this.personservice.update(id, input as person);
  }
}
