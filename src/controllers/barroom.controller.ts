import { Controller, Get, Post } from '@nestjs/common';
import { CreateBarroomDto } from 'src/entities/barroom/dto/create-barroom.dto';
import { BarroomService } from 'src/services/barroom.service';

@Controller('barroom')
export class BarroomController {
  constructor(private readonly barroomService: BarroomService) {}

  @Post('/')
  async createBarroom(createBarroomDto: CreateBarroomDto) {
    return this.barroomService.createCompany(createBarroomDto);
  }
}
