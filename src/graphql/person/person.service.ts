import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose'
import { person } from './interface/person.interface';
import { Model } from 'mongoose';
import { persondto } from './dto/person.dto';
import { personinput } from './input/person.input';

@Injectable()
export class PersonService {
  constructor( @InjectModel('person') private personmodel:Model<person>){}
  

  async findAll():Promise<persondto[]>{
    return await this.personmodel.find().exec();
  }

  async create(createperson:personinput):Promise<persondto>{
    const created = new this.personmodel(createperson);
    return await created.save()
  }
   async findOne(id:string):Promise<persondto>{
     return await this.personmodel.findOne({_id:id})
   }
   async delete(id:string):Promise<persondto>{
     return await this.personmodel.findByIdAndDelete(id)
   }

  async update(id:string,person:person):Promise<persondto>{
    return await this.personmodel.findByIdAndUpdate(id,person, {new:true})
  }

}
