import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCatalogDto {
  @ApiProperty({ type: [Number] })
  @IsNotEmpty()
  productId: number[];
}
