import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateBarroomDto } from 'src/entities/barroom/dto/create-barroom.dto';
import { BarroomService } from 'src/services/barroom.service';

@Controller('barroom')
export class BarroomController {
  constructor(private readonly barroomService: BarroomService) {}

  @Post('/')
  async createBarroom(@Body() createBarroomDto: CreateBarroomDto) {
    this.barroomService.createCompany(createBarroomDto);
  }
}
