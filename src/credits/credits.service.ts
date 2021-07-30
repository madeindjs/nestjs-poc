import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  create(createCreditDto: CreateCreditDto) {
    return this.creditRepository.save(createCreditDto);
  }

  findAll(user: User) {
    return this.creditRepository.find({ user });
  }

  findOne(id: number) {
    return this.creditRepository.findOne({ id });
  }
}
