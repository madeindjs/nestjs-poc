import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GithubModule } from '../github/github.module';
import { HashModule } from '../hash/hash.module';
import { User } from './entities/user.entity';
import { GithubConsumer } from './github.consumer';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, GithubConsumer],
  imports: [
    HashModule,
    GithubModule,
    TypeOrmModule.forFeature([User]),
    BullModule.registerQueue({ name: 'github' }),
  ],
  exports: [UsersService],
})
export class UsersModule {}
