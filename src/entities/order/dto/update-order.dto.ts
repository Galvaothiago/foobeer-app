import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';

export class UpdateBarroomDto extends PartialType(CreateOrderDto) {}
