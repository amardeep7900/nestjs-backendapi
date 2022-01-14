import {
  HttpException,
  HttpStatus,
  Injectable,
  
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createuserdto } from './dto/create_user.dto';
import { updateuserdto } from './dto/update_user.dto';
import { user, userdocument } from './schemas/user.model';

@Injectable()
export class UserService {
  @InjectModel('user') private readonly model: Model<userdocument>;

  async findAll(): Promise<user[]> {
    return await this.model.find().exec();
  }
  async findOne(id: string): Promise<user> {
    try {
      return await this.model.findById(id).exec();
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  async findbyname(name: string): Promise<user> {
    const onename = await this.model.findOne({ name: name }).exec();
    if (!onename) {
      throw new HttpException(
        'cannot find this name of user',
        HttpStatus.FORBIDDEN,
      );
    }
    return onename;
  }
  async create(createuserdto: createuserdto): Promise<user> {
    return await new this.model({
      ...createuserdto,
      createdAt: new Date(),
    }).save();
  }
  async update(id: string, updateuserdto: updateuserdto): Promise<user> {
    try {
      return await this.model.findByIdAndUpdate(id, updateuserdto).exec();
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  async delete(id: string): Promise<user> {
    try {
      return await this.model.findByIdAndDelete(id).exec();
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
