import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BarRoom } from 'src/entities/barroom/barroom.entity';
import { CreateBarroomDto } from 'src/entities/barroom/dto/create-barroom.dto';
import { Repository } from 'typeorm';

@Injectable()
export class BarroomService {
  constructor(
    @InjectRepository(BarRoom)
    private readonly barroomRepository: Repository<BarRoom>,
  ) {}

  createCompany(createBarroomDto: CreateBarroomDto) {
    const barroom = this.barroomRepository.create(createBarroomDto);

    return barroom;
  }
}
