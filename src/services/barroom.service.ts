import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { BarRoom } from 'src/entities/barroom/barroom.entity';
import { CreateBarroomDto } from 'src/entities/barroom/dto/create-barroom.dto';
import { BarroomException } from 'src/exceptions/barroom/barrom.exception';
import { BarRoomExistsException } from 'src/exceptions/barroom/barroom-exists.exception';
import { Repository } from 'typeorm';

@Injectable()
export class BarroomService {
  constructor(
    @InjectRepository(BarRoom)
    private readonly barroomRepository: Repository<BarRoom>,
  ) {}

  async createCompany(createBarroomDto: CreateBarroomDto) {
    try {
      const barroomExists = await this.findBarroomByEmail(
        createBarroomDto.email,
      );

      const saltRounds = 10;

      if (barroomExists) {
        throw new BarRoomExistsException();
      }

      const data = {
        ...createBarroomDto,
        password: await bcrypt.hash(createBarroomDto.password, saltRounds),
      };

      const userCreated = await this.barroomRepository.save(data);

      return {
        userCreated,
        password: undefined,
      };
    } catch (err) {
      throw new BarroomException(err.message);
    }
  }

  async findBarroomByEmail(email: string) {
    try {
      const barroom = await this.barroomRepository.findOne({
        where: {
          email,
        },
      });

      return barroom;
    } catch (err) {
      throw new BarroomException(err.message);
    }
  }

  async existBarroomByCNPJ(cnpj: string) {
    try {
      const barroom = await this.barroomRepository.findOne({
        where: {
          cnpj,
        },
      });

      if (!barroom) {
        return false;
      }

      return true;
    } catch (err) {
      throw new BarroomException(err.message);
    }
  }

  async existBarroomByEmail(email: string) {
    try {
      const barroom = await this.barroomRepository.findOne({
        where: {
          email,
        },
      });

      if (!barroom) {
        return false;
      }

      return true;
    } catch (err) {
      throw new BarroomException(err.message);
    }
  }
}
