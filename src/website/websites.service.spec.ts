import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Website } from './entities/website.entity';
import { WebsitesService } from './websites.service';

describe('WebsiteService', () => {
  let service: WebsitesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebsitesService],
      imports: [
        TypeOrmModule.forFeature([Website]),
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Website, User],
          synchronize: true,
        }),
      ],
    }).compile();

    service = module.get<WebsitesService>(WebsitesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
