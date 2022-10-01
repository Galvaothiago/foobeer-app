import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BarTable } from 'src/entities/bar-table/bar-table.entity';
import { CreateBarTableDto } from 'src/entities/bar-table/dto/create-bar-table.dto';
import { StatusTable } from 'src/entities/bar-table/status.enum';
import { Repository } from 'typeorm';

@Injectable()
export class BarTableService {
  constructor(
    @InjectRepository(BarTable)
    private readonly barTableRepository: Repository<BarTable>,
  ) {}

  async create(createBarTable: CreateBarTableDto): Promise<BarTable> {
    return await this.barTableRepository.save(createBarTable);
  }

  async findAll(): Promise<BarTable[]> {
    return await this.barTableRepository.find();
  }

  async findByNumberTable(numberTable: number): Promise<BarTable> {
    return await this.barTableRepository.findOne({
      where: { number: numberTable },
    });
  }

  async findById(id: string): Promise<BarTable> {
    return await this.barTableRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, barTable: BarTable): Promise<BarTable> {
    await this.barTableRepository.update(id, barTable);
    return await this.barTableRepository.findOne({
      where: { id },
    });
  }

  async remove(id: string): Promise<void> {
    await this.barTableRepository.delete(id);
  }

  async findByBarroomCNPJ(barroomCNPJ: string): Promise<BarTable[]> {
    return await this.barTableRepository.find({
      where: { barroomCNPJ },
    });
  }

  async prepareAndOpenTable(tableId: string) {
    const table = await this.findById(tableId);

    table.status = StatusTable.OPENED;
    table.openAt = new Date();

    await this.update(tableId, table);
  }

  async closeTableBill(tableId: string) {
    const table = await this.findById(tableId);

    table.status = StatusTable.CLOSED;
    table.closeAt = new Date();

    await this.update(tableId, table);
  }

  async createUserWithAssociationTable() {}
}
