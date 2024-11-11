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
    type: String,
    example: '$ 32.32',
  })
  companyValueNow: string;

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
    type: String,
    example: '$ 2.42',
  })
  bestCompanyPrice: string;

  @ApiProperty({
    description: 'The lowest price of the company stock.',
    type: String,
    example: '$ 54.23',
  })
  worstCompanyPrice: string;
}
