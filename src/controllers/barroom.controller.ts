import { Body, Controller, Get, Post } from '@nestjs/common';
import { Roles } from 'src/decorators/user-roles.decorator';
import { CreateBarroomDto } from 'src/entities/barroom/dto/create-barroom.dto';
import { Role } from 'src/entities/user/roles-enum';
import { BarroomService } from 'src/services/barroom.service';

@Controller('barroom')
export class BarroomController {
  constructor(private readonly barroomService: BarroomService) {}

  @Post('/')
  async createBarroom(@Body() createBarroomDto: CreateBarroomDto) {
    this.barroomService.createCompany(createBarroomDto);
  }

  @Roles(Role.GOD)
  @Get('/')
  teste() {
    return 'teste';
  }
}
