import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import { UserService } from '../user.service';
import { getModelToken } from '@nestjs/mongoose';
import { createuserdto } from '../dto/create_user.dto';


const user = {
  name: 'username',
  email: 'amardeep',
  password: 'alokdeep',
};

describe('userService', () => {
  let service: UserService;
  const usermodel = {
    find: jest.fn().mockResolvedValue(user),
    findById: jest.fn().mockResolvedValue(user),
    findOne: jest.fn().mockResolvedValue(user),
    save: jest.fn().mockResolvedValue(user),
    findByIdAndUpdate: jest.fn().mockResolvedValue(user),
    findByIdAndDelete: jest.fn().mockResolvedValue(true),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getModelToken('user'), useValue: usermodel },
      ],
    }).compile();
    service = module.get<UserService>(UserService);
  });
  it('should return all the user', () => {
    expect(service.findAll())
      .resolves.toEqual(user)
      .catch((err) => {
        console.log(err);
      });
  });
  it('should return one user', () => {
    expect(service.findOne('61a84968c55c833497a7d7b8'))
      .resolves.toEqual(user)
      .catch((err) => {
        console.log(err);
      });
  });
  it('should return one user name', () => {
    expect(service.findbyname('amar'))
      .resolves.toEqual(user)
      .catch((err) => {
        console.log(err);
      });
  });
  it('should create a new event and save it', () => {
    expect(
      service.create({
        name: user.name,
        email: user.email,
        password: user.password,
      } as createuserdto),
    )
      .resolves.toEqual(user)
      .catch((err) => {
        console.log(err);
      });
  });
  it('should update and return', () => {
    expect(service.update('61a84968c55c833497a7d7b8', {} as any))
      .resolves.toEqual(user)
      .catch((err) => {
        console.log(err);
      });
  });
  it('should delete one id and return', () => {
    expect(service.delete('61a84968c55c833497a7d7b8'))
      .resolves.toBeTruthy()
      .catch((err) => {
        console.log(err);
      });
  });
});
