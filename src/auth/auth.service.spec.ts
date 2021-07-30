import { BullModule } from '@nestjs/bull';
import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashModule } from '../hash/hash.module';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [AuthService, UsersService],
      imports: [
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          autoLoadEntities: true,
          synchronize: true,
        }),
        UsersModule,
        HashModule,
        JwtModule.register({
          secret: 'test',
        }),
        BullModule.forRoot({
          redis: {
            name: 'test',
            host: 'localhost',
            port: 6379,
          },
        }),
        BullModule.registerQueue({ name: 'github' }),
      ],
    }).compile();

    const usersService = moduleRef.get(UsersService);
    await usersService.create({
      email: `auth-${new Date().getTime()}@test.fr`,
      password: 'tototo',
    });

    service = moduleRef.get(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getToken', () => {
    it('should get token', async () => {
      const user = new User();
      user.id = 1;
      user.email = 'toto@toto.fr';
      expect(await service.getToken(user)).toBeTruthy();
    });
  });
});
