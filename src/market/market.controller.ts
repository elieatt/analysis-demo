import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { MarketService } from './market.service';
import { MarketSummaryDto } from './dto/market-summary.dto';
import { MarketDetailDto } from './dto/market-detail.dto';
import { Locale } from 'src/common/decorators/locale.decorator';
import { ValidateCurrencyCodePipe } from 'src/common/pipes/validate-currency-code.pipe';

@ApiTags('Markets')
@Controller('markets')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  /***********************************************************************************************************/
  @Get()
  @ApiOperation({ summary: 'Retrieve a brief list of all markets' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of market summaries',
    type: [MarketSummaryDto],
  })
  @ApiQuery({ name: 'currency', required: false })
  findAll(
    @Locale() locale: string,
    @Query('currency', ValidateCurrencyCodePipe) currencyCode: string,
  ) {
    return this.marketService.findAll();
  }

  /***********************************************************************************************************/
  @Get(':id')
  @ApiOperation({
    summary: 'Retrieve detailed information about a specific market by its ID',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the market',
    type: Number,
  })
  @ApiOkResponse({
    description: 'Returns detailed information about the market',
    type: MarketDetailDto,
  })
  @ApiNotFoundResponse({
    description: 'Market not found',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.marketService.findById(id);
  }
}
