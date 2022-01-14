import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonResolver } from './person.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { personschema } from './schema/person.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:'person',schema:personschema}])],
  providers: [PersonService, PersonResolver]
})
export class PersonModule {}
