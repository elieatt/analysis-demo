import { ApiProperty } from '@nestjs/swagger';
import { PriceDto } from 'src/common/dto/price.dto';

export class CompanyDetailsDto {
  @ApiProperty({
    description: 'The unique identifier of the company.',
    type: Number,
    example: 1,
  })
  companyId: number;

  @ApiProperty({
    description: 'The name of the company.',
    type: String,
    example: 'Mango Pink',
  })
  companyName: string;

  @ApiProperty({
    description: 'The unique identifier of the market.',
    type: Number,
    example: 0,
  })
  marketId: number;

  @ApiProperty({
    description: 'The name of the market.',
    type: String,
    example: 'Energy',
  })
  marketName: string;

  @ApiProperty({
    description: 'A brief description of the company.',
    type: String,
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed molestie nisi, nec bibendum lorem',
  })
  companyDescription: string;

  @ApiProperty({
    description: 'The current price of the company stock.',
    type: Number,
    example: 8.290516318044356,
  })
  companyCurrentPrice: number;

  @ApiProperty({
    description: 'The trend of the company stock (e.g., growth, decline).',
    type: String,
    example: 'growth',
  })
  companyTrend: string;

  @ApiProperty({
    description: 'The list of prices for the last 30 days.',
    type: [PriceDto],
  })
  pricesLast30Days: PriceDto[];
}
