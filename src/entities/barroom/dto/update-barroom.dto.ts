import { PartialType } from '@nestjs/mapped-types';
import { CreateBarroomDto } from './create-barroom.dto';

export class UpdateBarroomDto extends PartialType(CreateBarroomDto) {}
