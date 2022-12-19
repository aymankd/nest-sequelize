import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { Op } from 'sequelize';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

@Module({
  imports: [DatabaseModule, UsersModule],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly usersService: UsersService) {}
  onApplicationBootstrap() {
    this.query1();
    this.query2();
    this.query3();
    this.query4();
    this.query5();
    this.query6();
    this.query7();
  }

  async query1() {
    const users = await this.usersService.findAll({
      where: {
        firstName: 'Timber',
        lastName: 'Saw',
      },
    });
    console.log(
      'query1: ',
      users.map((user) => user.dataValues),
    );
  }

  async query2() {
    const users = await this.usersService.findAll({
      where: {
        firstName: { [Op.not]: 'Timber' },
      },
    });
    console.log(
      'query2: ',
      users.map((user) => user.dataValues),
    );
  }

  async query3() {
    const users = await this.usersService.findAll({
      where: {
        [Op.or]: [{ firstName: 'Timber' }, { firstName: 'Mike' }],
      },
    });
    console.log(
      'query3: ',
      users.map((user) => user.dataValues),
    );
  }

  async query4() {
    const users = await this.usersService.findAll({
      where: {
        firstName: {
          [Op.in]: ['Timber', 'Mike'],
        },
      },
    });
    console.log(
      'query4: ',
      users.map((user) => user.dataValues),
    );
  }

  async query5() {
    const users = await this.usersService.findAll({
      where: {
        age: { [Op.lte]: 10 },
      },
    });
    console.log(
      'query5: ',
      users.map((user) => user.dataValues),
    );
  }

  async query6() {
    const users = await this.usersService.findAll({
      where: {
        firstName: { [Op.like]: '%er%' },
      },
    });
    console.log(
      'query6: ',
      users.map((user) => user.dataValues),
    );
  }

  async query7() {
    const users = await this.usersService.findAll({
      where: {
        age: { [Op.between]: [15, 25] },
      },
    });
    console.log(
      'query7: ',
      users.map((user) => user.dataValues),
    );
  }
}
