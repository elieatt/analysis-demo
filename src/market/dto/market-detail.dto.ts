import { ApiProperty } from '@nestjs/swagger';
import { PriceDto } from 'src/common/dto/price.dto';
import { TrendDirection } from 'src/common/enums/trend-direction.enum';

export class MarketDetailDto {
  @ApiProperty({
    example: 0,
    description: 'The unique identifier of the market',
  })
  marketId: number;

  @ApiProperty({ example: 'name', description: 'The name of the market' })
  marketName: string;

  @ApiProperty({
    example: 'Lorem ipsum dolor sit amet',
    description: 'A brief description of the market',
  })
  marketDescription: string;

  @ApiProperty({
    example: '$ 13.32',
    description: 'The current price of the market',
  })
  marketCurrentPrice: string;

  @ApiProperty({
    enum: TrendDirection,
    example: TrendDirection.Downward,
    description: 'The current trend of the market, e.g., gain or loss',
  })
  marketTrend: TrendDirection;

  @ApiProperty({
    type: () => [PriceDto],
    description:
      'List of prices for the last 30 days, with date and price for each entry',
  })
  pricesLast30Days: PriceDto[];
}
