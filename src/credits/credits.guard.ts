import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { CreditsService } from './credits.service';

@Injectable()
export class CreditsGuard implements CanActivate {
  constructor(private readonly creditsService: CreditsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const sum = await this.creditsService.getSum(request.user);

    if (sum <= 0) {
      throw new HttpException('credit insufficient', 402);
    }

    return true;
  }
}
