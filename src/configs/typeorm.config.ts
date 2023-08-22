import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { User } from 'src/auth/entities/user.entity';
import { Board } from 'src/boards/entities/board.entity';

dotenv.config();

export const typeORMConfig: TypeOrmModuleOptions = {
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}', Board, User],
  synchronize: true,
};
