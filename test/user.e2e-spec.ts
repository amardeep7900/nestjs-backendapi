import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';

describe('usercontroller E2E test', () => {
  let app: INestApplication;
  let sUserService = { findall: () => ['test'] };
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    })
      .overrideProvider(UserService)
      .useValue(UserService)
      .compile();
    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  it('should find all user', () => {
    return request(app.getHttpServer())
      .get('alok')

      .expect(201)
      .expect({
        data: sUserService.findall(),
      });
  });
});
