import { PartialType } from '@nestjs/mapped-types';
import { CreateBarTableDto } from './create-bar-table.dto';

export class UpdateBarTableDto extends PartialType(CreateBarTableDto) {}
