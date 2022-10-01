import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BarRoom } from 'src/entities/bar-room/bar-room.entity';
import { CreateBarroomDto } from 'src/entities/bar-room/dto/create-bar-room.dto';
import { UpdateBarroomDto } from 'src/entities/bar-room/dto/update-bar-room.dto';
import { BarRoomExistsException } from 'src/exceptions/bar-room/bar-room-exists.exception';
import { BarroomException } from 'src/exceptions/bar-room/bar-room.exception';
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

      if (barroomExists) {
        throw new BarRoomExistsException();
      }

      return await this.barroomRepository.save(createBarroomDto);
    } catch (err) {
      throw new BarroomException(err.message);
    }
  }

  async updateBarroom(id: string, updateBarroomDto: UpdateBarroomDto) {
    try {
      const barroom = await this.barroomRepository.findOne({
        where: {
          id,
        },
      });

      if (!barroom) {
        throw new BarroomException('Not found');
      }

      await this.barroomRepository.update(id, updateBarroomDto);

      return await this.barroomRepository.findOne({
        where: {
          id,
        },
      });
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

  async findAllBarroom() {
    try {
      const allBarroom = await this.barroomRepository.find();

      return allBarroom;
    } catch (err) {
      throw new BarroomException(err.message);
    }
  }
}
