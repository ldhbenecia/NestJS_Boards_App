import { DataSource, Repository } from 'typeorm';
import { Board } from '../entities/board.entity';
import { Injectable } from '@nestjs/common';
import { createBoardDto } from '../dto/create-board.dto';
import { BoardStatus } from '../board-status.enum';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  async createBoards(createBoardDto: createBoardDto, user: User): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user,
    });

    await this.save(board);
    return board;
  }
}
