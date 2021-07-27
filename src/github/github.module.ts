import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { GithubConsumer } from './github.consumer';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';

@Module({
  providers: [GithubService, GithubConsumer],
  imports: [BullModule.registerQueue({ name: 'github' })],
  controllers: [GithubController],
})
export class GithubModule {}
