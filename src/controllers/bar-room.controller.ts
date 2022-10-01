import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Roles } from 'src/decorators/user-roles.decorator';
import { CreateBarroomDto } from 'src/entities/bar-room/dto/create-bar-room.dto';
import { UpdateBarroomDto } from 'src/entities/bar-room/dto/update-bar-room.dto';
import { Role } from 'src/entities/user/roles-enum';
import { BarroomService } from 'src/services/bar-room.service';

@Controller('barroom')
export class BarroomController {
  constructor(private readonly barroomService: BarroomService) {}

  @Roles(Role.GOD, Role.ADMIN)
  @Post('/')
  async createBarroom(@Body() createBarroomDto: CreateBarroomDto) {
    this.barroomService.createCompany(createBarroomDto);
  }

  @Roles(Role.GOD, Role.ADMIN)
  @Get('/')
  async getAllBarrooms() {
    return this.barroomService.findAllBarroom();
  }

  @Post('/:id')
  async updateBarroom(
    @Param('id') id: string,
    @Body() updateBarroomDto: UpdateBarroomDto,
  ) {
    this.barroomService.updateBarroom(id, updateBarroomDto);
  }
}
