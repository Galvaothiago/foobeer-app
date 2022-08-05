import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOpeningHoursDto } from 'src/entities/openinig-hours/dto/create-opening-hours.dto';
import { UpdateOpeningHoursDto } from 'src/entities/openinig-hours/dto/update-opening-hours.dto';
import { OpeningHours } from 'src/entities/openinig-hours/opening-hours.entity';
import { OpeningHoursNotFoundException } from 'src/exceptions/opening-hours/opening-hours-not-found.exception';
import { OpeningHoursException } from 'src/exceptions/opening-hours/opening-hours.exception';
import { Repository } from 'typeorm';

@Injectable()
export class OpeningHoursService {
  constructor(
    @InjectRepository(OpeningHours)
    private readonly openingHoursRepository: Repository<OpeningHours>,
  ) {}

  async create(createOpeningHoursDto: CreateOpeningHoursDto) {
    return await this.openingHoursRepository.save(createOpeningHoursDto);
  }

  async findAllByBarroomId(barroomId: string) {
    try {
      const result = await this.openingHoursRepository.findBy({
        barroomId,
      });

      if (result.length === 0) {
        throw new OpeningHoursNotFoundException(
          'Opening hours not found, registe it',
        );
      }

      return result;
    } catch (err) {
      throw new OpeningHoursException(err.message);
    }
  }

  async updateOpenHoursById(
    id: string,
    updateOpeningHoursDto: UpdateOpeningHoursDto,
  ) {
    try {
      await this.openingHoursRepository.update(id, updateOpeningHoursDto);
    } catch (err) {
      throw new OpeningHoursException(err.message);
    }
  }

  async deleteOpenHoursById(id: string) {
    try {
      await this.openingHoursRepository.delete(id);
    } catch (err) {
      throw new OpeningHoursException(err.message);
    }
  }
}
