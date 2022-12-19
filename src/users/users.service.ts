import { Injectable, Inject } from '@nestjs/common';
import { FindOptions } from 'sequelize';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private readonly usersRepository: typeof User,
  ) {}

  findAll(options?: FindOptions<User>) {
    return this.usersRepository.findAll<User>({
      ...options,
      // include: [{ model: User }],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
}
