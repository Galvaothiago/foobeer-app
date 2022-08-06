import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateOpeningHoursDto } from 'src/entities/openinig-hours/dto/create-opening-hours.dto';
import { OpeningHoursService } from 'src/services/opening-hours.service';

@Controller('openingHours')
export class OpeningHoursController {
  constructor(private readonly openingHoursService: OpeningHoursService) {}

  @Post('/')
  async create(@Body() createOpeningHoursDto: CreateOpeningHoursDto) {
    const openingHours = this.openingHoursService.create(createOpeningHoursDto);

    return openingHours;
  }

  @Get('/:barroomId')
  async getAllByBarroom(@Param('barroomId') barroomId: string) {
    const openingHours = await this.openingHoursService.findAllByBarroomId(
      barroomId,
    );

    return openingHours;
  }
}
