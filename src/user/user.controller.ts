import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { createuserdto } from './dto/create_user.dto';
import { updateuserdto } from './dto/update_user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class UserController {
  constructor(private readonly userservice: UserService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get('getall')
  async index() {
    return await this.userservice.findAll();
  }
  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.userservice.findOne(id);
  }
  @Get('find/:name')
  found(@Param('name') name: string): any {
    return this.userservice.findbyname(name);
  }
  @Post('create')
  async create(@Body() Createuserdto: createuserdto) {
    return await this.userservice.create(Createuserdto);
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateuserdto: updateuserdto) {
    return await this.userservice.update(id, updateuserdto);
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.userservice.delete(id);
    return 'deleted';
  }
}
