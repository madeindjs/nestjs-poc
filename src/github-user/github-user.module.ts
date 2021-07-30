import { Module } from '@nestjs/common';
import { GithubModule } from '../github/github.module';
import { GithubConsumer } from './github.consumer';

@Module({
  imports: [GithubModule],
  providers: [GithubConsumer],
})
export class GithubUserModule {}
