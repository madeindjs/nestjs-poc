import { Process, Processor } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { GithubUserSearchJob } from './github.interface';
import { GithubService } from './github.service';

@Injectable()
@Processor('github')
export class GithubConsumer {
  private readonly logger = new Logger(GithubConsumer.name);

  constructor(private readonly githubService: GithubService) {}

  @Process()
  async process(job: Job<GithubUserSearchJob>) {
    this.logger.debug(
      `Processing job ${job.id} of type ${job.name} with data ${JSON.stringify(
        job.data,
      )}...`,
    );
    const githubUser = await this.githubService.findUserByEmail(job.data.email);
  }
}
