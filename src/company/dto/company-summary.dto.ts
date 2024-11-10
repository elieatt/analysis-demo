import { ApiProperty } from '@nestjs/swagger';
import { MarketSummaryDto } from 'src/market/dto/market-summary.dto';

export class CompanySummaryDto {
  @ApiProperty({
    description: 'The unique identifier of the company',
    example: 0,
  })
  id: number;

  @ApiProperty({ description: 'The name of the company', example: 'name' })
  name: string;

  @ApiProperty({
    description: 'The market to which the company belongs',
    type: MarketSummaryDto,
  })
  market: MarketSummaryDto;
}
