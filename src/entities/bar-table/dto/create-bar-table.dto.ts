import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBarTableDto {
  @IsNotEmpty()
  number: number;

  @IsOptional()
  barroomCNPJ: string;

  @IsOptional()
  openAt: Date;

  @IsOptional()
  closeAt: Date;

  @IsOptional()
  peopleAtTheTable: number;

  @IsOptional()
  peopleConnected: number;

  @IsOptional()
  totalValue: number;
}
