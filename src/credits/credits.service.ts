import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateCreditDto } from './dto/create-credit.dto';
import { Credit } from './entities/credit.entity';

@Injectable()
export class CreditsService {
  constructor(
    @InjectRepository(Credit)
    private readonly creditRepository: Repository<Credit>,
  ) {}

  createFromRequest(request: Request, user: User, cost: number = -1) {
    const params = { ...request.body };
    params.user = undefined;

    return this.creditRepository.save({
      method: request.method,
      cost,
      user,
      url: request.url,
      parameters: JSON.stringify(params),
    });
  }

  create(createCreditDto: CreateCreditDto) {
    return this.creditRepository.save(createCreditDto);
  }

  async getSum(user: User): Promise<number> {
    const { sum } = await this.creditRepository
      .createQueryBuilder()
      .select('SUM(cost) AS sum')
      .where({ user })
      .getRawOne();

    return sum;
  }

  findAll(user: User) {
    return this.creditRepository.find({ user });
  }

  findOne(id: number) {
    return this.creditRepository.findOne({ id });
  }
}
