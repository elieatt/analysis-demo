import { ApiProperty } from '@nestjs/swagger';

export class PriceDto {
  @ApiProperty({
    example: '2024-11-10',
    description: 'The date of the price entry',
  })
  date: string;

  @ApiProperty({
    example: 23.51998487903226,
    description: 'The  price on this date',
  })
  price: number;
}
