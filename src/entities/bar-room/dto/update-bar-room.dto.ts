import { PartialType } from '@nestjs/mapped-types';
import { CreateBarroomDto } from './create-bar-room.dto';

export class UpdateBarroomDto extends PartialType(CreateBarroomDto) {}
