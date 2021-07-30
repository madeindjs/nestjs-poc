// src/users/users.service.spec.ts
import { BullModule } from '@nestjs/bull';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GithubModule } from '../github/github.module';
import { HashModule } from '../hash/hash.module';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HashModule,
        GithubModule,
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [User],
          synchronize: true,
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
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
