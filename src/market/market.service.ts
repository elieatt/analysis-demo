import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Market } from 'src/entities/market.entity';
import { Repository } from 'typeorm';
import { TrendDirection } from 'src/common/enums/trend-direction.enum';
import { getDateDaysAgo } from 'src/utils/get-days-ago.util';
import { CurrencyService } from 'src/currency/currency.service';

@Injectable()
export class MarketService {
  constructor(
    @InjectRepository(Market)
    private readonly marketRepo: Repository<Market>,
    private readonly currencyService: CurrencyService,
  ) {}

  /**
   * Finds a market by its ID and retrieves detailed information, including the current price, trend over the past 7 days, and price history over the last 30 days.
   * @param marketId The ID of the market to retrieve.
   *  @param {string} locale - The locale for currency conversion.
   * @param {string | undefined} currency - The currency for conversion.
   * @returns A promise that resolves to the market details, including trend direction and recent prices.
   * @throws NotFoundException if the market with the specified ID does not exist.
   */
  async findById(
    marketId: number,
    locale: string,
    currency: string | undefined,
  ) {
    const thirtyDaysAgo = getDateDaysAgo(30);
    const sevenDaysAgo = getDateDaysAgo(7);

    const queryBuilder = this.marketRepo
      .createQueryBuilder('m')
      .select([
        'm.id AS market_id',
        'm.name AS market_name',
        'm.description AS market_description',
        '(SELECT price FROM market_price mp WHERE mp.market_id = m.id ORDER BY mp.date DESC LIMIT 1) AS market_current_price',
        `(SELECT REGR_SLOPE(mp.price, mp.row_number)
          FROM (
            SELECT price, ROW_NUMBER() OVER (ORDER BY date) AS row_number
            FROM market_price mp
            WHERE mp.market_id = m.id AND date >= :sevenDaysAgo
          ) AS mp) AS market_trend_slope`,
        `(SELECT jsonb_agg(jsonb_build_object('date', mp.date, 'price', mp.price) ORDER BY mp.date DESC)
          FROM market_price mp 
          WHERE mp.market_id = m.id AND mp.date >= :thirtyDaysAgo) AS prices_last_30_days`,
      ])
      .where('m.id = :marketId', { marketId })
      .setParameters({
        thirtyDaysAgo,
        sevenDaysAgo,
      });

    const rawResult = await queryBuilder.getRawOne();

    if (!rawResult) {
      throw new NotFoundException('Market not found');
    }

    const marketTrend =
      rawResult.market_trend_slope >= 0
        ? TrendDirection.Upward
        : TrendDirection.Downward;

    const [marketCurrentPrice] = await this.currencyService.convertPrices(
      [rawResult.market_current_price],
      locale,
      currency,
    );

    const pricesLast30Days = await this.currencyService.convertPriceHistory(
      rawResult.prices_last_30_days || [],
      locale,
      currency,
    );
    const result = {
      marketId: rawResult.market_id,
      marketName: rawResult.market_name,
      marketDescription: rawResult.market_description,
      marketCurrentPrice,
      marketTrend: marketTrend,
      pricesLast30Days,
    };

    return result;
  }

  /**
   * Retrieves a list of all markets, including only the ID and name of each market.
   * @returns A promise that resolves to an array of market entities with ID and name only.
   */
  findAll() {
    return this.marketRepo.find({ select: { id: true, name: true } });
  }
}
