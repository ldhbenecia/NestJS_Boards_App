import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from '../dto/auth-credential.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUsers(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const user = this.create({ username, password });
    await this.save(user);
  }
}
