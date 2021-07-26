import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/users/entities/user.entity';
import * as request from 'supertest';
import { UsersModule } from '../src/users/users.module';
import { UsersService } from '../src/users/users.service';
import { TestAppModule } from './testApp.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  let userService: UsersService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, TestAppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    userService = moduleFixture.get(UsersService);
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/users').expect(200);
  });

  describe('/ (POST)', () => {
    it('should create', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({
          email: `test@test-${new Date().getTime()}.fr`,
          password: 'tototo',
        })
        .expect(201);
    });

    it('should not create because user already exists', async () => {
      const { email } = await userService.create({
        email: `get-user-${new Date().getTime()}@test.fr`,
        password: 'tototo',
      });

      await request(app.getHttpServer())
        .post('/users')
        .send({ email, password: '123456' })
        .expect(400);
    });

    it('should not create because missing password', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({ email: 'test@test.fr' })
        .expect(400);
    });
  });

  describe('/:id (GET)', () => {
    let user: User;

    beforeAll(async () => {
      user = await userService.create({
        email: `get-user-${new Date().getTime()}@test.fr`,
        password: 'tototo',
      });
    });

    it('should get user', () => {
      return request(app.getHttpServer()).get(`/users/${user.id}`).expect(200);
    });

    it('should get 404', () => {
      return request(app.getHttpServer()).get(`/users/999999`).expect(404);
    });
  });

  describe('/:id (PATCH)', () => {
    it('should update user', async () => {
      const user = await userService.create({
        email: `get-user-${new Date().getTime()}@test.fr`,
        password: 'tototo',
      });
      await request(app.getHttpServer())
        .patch(`/users/${user.id}`)
        .send({ password: 'tatata' })
        .expect(200);

      const userUpdated = await userService.findOne(user.id);

      expect(userUpdated.password).not.toEqual(user.password);
    });

    it('should get 404', () => {
      return request(app.getHttpServer())
        .patch(`/users/999999`)
        .send({ password: 'tatata' })
        .expect(404);
    });
  });

  describe('/:id (DELETE)', () => {
    it('should delete user', async () => {
      const user = await userService.create({
        email: `get-user-${new Date().getTime()}@test.fr`,
        password: 'tototo',
      });
      await request(app.getHttpServer())
        .delete(`/users/${user.id}`)
        .expect(200);

      const userDeleted = await userService.findOne(user.id);
      expect(userDeleted).toBeUndefined();
    });

    it('should get 404', () => {
      return request(app.getHttpServer()).delete(`/users/999999`).expect(404);
    });
  });
});
