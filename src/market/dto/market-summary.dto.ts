import { ApiProperty } from '@nestjs/swagger';

export class MarketSummaryDto {
  @ApiProperty({
    description: 'The unique identifier of the market',
    example: 0,
  })
  id: number;

  @ApiProperty({ description: 'The name of the market', example: 'name' })
  name: string;
}
