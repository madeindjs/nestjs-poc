import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const existingUser = await this.usersService.findOneByEmail(
      createUserDto.email,
    );

    if (existingUser !== undefined) {
      throw new BadRequestException({ email: 'already exists' });
    }

    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);

    if (user === undefined) {
      throw new NotFoundException();
    }

    return user;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    await this.ensureUserExists(id);
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.ensureUserExists(id);
    await this.usersService.remove(+id);
  }

  private async ensureUserExists(id: string) {
    const user = await this.usersService.findOne(+id);

    if (user === undefined) {
      throw new NotFoundException();
    }
  }
}
