import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { createBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './repositories/board.repository';
import { Board } from './entities/board.entity';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  createBoards(createBoardDto: createBoardDto, user: User): Promise<Board> {
    return this.boardRepository.createBoards(createBoardDto, user);
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({ where: { id: Number(id) } });

    if (!found) {
      throw new NotFoundException(`Can't find Board with id: ${id}`);
    }

    return found;
  }

  async deleteBoard(id: number, user: User): Promise<void> {
    const result = await this.boardRepository
      .createQueryBuilder('board')
      .delete()
      .from(Board)
      .where('userId = :userId', { userId: user.id })
      .andWhere('id = :id', { id })
      .execute();

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id: ${id}`);
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardRepository.save(board);

    return board;
  }
}
