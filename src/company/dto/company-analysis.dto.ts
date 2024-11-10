import { ApiProperty } from '@nestjs/swagger';

export class CompanyAnalysisDto {
  @ApiProperty({
    description: 'The name of the company.',
    type: String,
    example: 'Banana Fucsia',
  })
  companyName: string;

  @ApiProperty({
    description: 'The unique identifier of the company.',
    type: Number,
    example: 3,
  })
  companyId: number;

  @ApiProperty({
    description: 'The name of the market.',
    type: String,
    example: 'Farming',
  })
  marketName: string;

  @ApiProperty({
    description: 'The unique identifier of the market.',
    type: Number,
    example: 1,
  })
  marketId: number;

  @ApiProperty({
    description: 'The current value of the company.',
    type: Number,
    example: 13.401493195564514,
  })
  companyValueNow: number;

  @ApiProperty({
    description: 'The trend of the company stock (e.g., growth, decline).',
    type: String,
    example: 'growth',
  })
  companyTrend: string;

  @ApiProperty({
    description: 'The trend of the market (e.g., growth, loss).',
    type: String,
    example: 'loss',
  })
  marketTrend: string;

  @ApiProperty({
    description: 'The highest price of the company stock.',
    type: Number,
    example: 13.401493195564514,
  })
  bestCompanyPrice: number;

  @ApiProperty({
    description: 'The lowest price of the company stock.',
    type: Number,
    example: 4.093088457661291,
  })
  worstCompanyPrice: number;
}
