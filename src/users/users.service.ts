import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HashService } from '../hash/hash.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashService: HashService,
  ) {}

  create({ email, password }: CreateUserDto) {
    return this.userRepository.save({
      email: email.toLowerCase(),
      passwordHashed: this.hashService.hashString(password),
    });
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({ id });
  }

  findOneBy(field: keyof User, value: string) {
    return this.userRepository.findOne({ [field]: value });
  }

  findOneByEmail(email: string) {
    return this.findOneBy('email', email);
  }

  async update(id: number, { password, resetPasswordToken }: UpdateUserDto) {
    const user = await this.findOne(id);

    if (user === undefined) {
      throw Error('Cannot find user');
    }

    if (password !== undefined) {
      user.passwordHashed = this.hashService.hashString(password);
    }

    if (resetPasswordToken !== undefined) {
      user.resetPasswordToken = resetPasswordToken;
    }

    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (user === undefined) {
      throw Error('Cannot find user');
    }

    return this.userRepository.remove(user);
  }
}
