import { InjectRepository } from '@nestjs/typeorm';
import { BarTable } from 'src/entities/bar-table/bar-table.entity';
import { Repository } from 'typeorm';

export class BarTableService {
  constructor(
    @InjectRepository(BarTable)
    private readonly barTableRepository: Repository<BarTable>,
  ) {}
}
