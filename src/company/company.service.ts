import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/entities/company.entity';
import { Repository } from 'typeorm';
import { TrendDirection } from 'src/common/enums/trend-direction.enum';
import { CompanyFilterDto } from './dto/company-filter.dto';
import { mapTrendSlopeToDirection } from 'src/utils/map-slpoe-to-direction.util';
import { getDateDaysAgo } from 'src/utils/get-days-ago.util';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
  ) {}
  /**
   * Fetches all companies with the given filter options.
   * This method retrieves companies along with their latest price,
   * price trends over the past 30 and 7 days, and additional company information.
   *
   * @param filter - The filter criteria for retrieving the companies.
   * @returns A list of companies with relevant information such as trends and price history.
   */
  async fetchAllCompanies(filter: CompanyFilterDto) {
    const { marketId, companyTrend, marketTrend } = filter;
    const thirtyDaysAgo = getDateDaysAgo(30);
    const sevenDaysAgo = getDateDaysAgo(7);

    const queryBuilder = this.companyRepo
      .createQueryBuilder('c')
      .select([
        'c.id AS company_id',
        'm.id AS market_id',
        'c.name AS company_name',
        'm.name AS market_name',
        // Latest price (using subquery for the latest price)
        '(SELECT price FROM company_price p WHERE p.company_id = c.id ORDER BY p.date DESC LIMIT 1) AS company_value_now',
        // Best and worst prices in the last 30 days
        'MAX(CASE WHEN p.date >= :thirtyDaysAgo THEN p.price END) AS best_price_30_days',
        'MIN(CASE WHEN p.date >= :thirtyDaysAgo THEN p.price END) AS worst_price_30_days',
        // Regression slope for company prices (trend)
        `(SELECT REGR_SLOPE(cp.price, cp.row_number)
          FROM (
            SELECT price, ROW_NUMBER() OVER (ORDER BY date) AS row_number
            FROM company_price cp
            WHERE cp.company_id = c.id AND date >= :sevenDaysAgo
          ) AS cp) AS company_trend_slope`,
        // Regression slope for market prices (trend)
        `(SELECT REGR_SLOPE(mp.price, mp.row_number)
          FROM (
            SELECT price, ROW_NUMBER() OVER (ORDER BY date) AS row_number
            FROM market_price mp
            WHERE mp.market_id = m.id AND date >= :sevenDaysAgo
          ) AS mp) AS market_trend_slope`,
      ])
      .leftJoin('c.market', 'm')
      .leftJoin('company_price', 'p', 'p.company_id = c.id')
      .leftJoin('market_price', 'mp', 'mp.market_id = m.id');

    if (marketId !== undefined) {
      queryBuilder.andWhere('(m.id = :marketId)', {
        marketId: marketId,
      });
    }

    queryBuilder.groupBy('c.id, m.id').orderBy('c.id', 'DESC');

    queryBuilder.setParameters({
      thirtyDaysAgo,
      sevenDaysAgo,
    });

    const rawQueryResult = await queryBuilder.getRawMany();
    const result = rawQueryResult
      .filter((row) => {
        const companyTrendMatch =
          companyTrend === undefined ||
          (companyTrend === TrendDirection.Upward &&
            row.company_trend_slope >= 0) ||
          (companyTrend === TrendDirection.Downward &&
            row.company_trend_slope < 0);

        const marketTrendMatch =
          marketTrend === undefined ||
          (marketTrend === TrendDirection.Upward &&
            row.market_trend_slope >= 0) ||
          (marketTrend === TrendDirection.Downward &&
            row.market_trend_slope < 0);

        return companyTrendMatch && marketTrendMatch;
      })
      .map((row) => ({
        companyName: row.company_name,
        companyId: row.company_id,
        marketName: row.market_name,
        marketId: row.market_id,
        companyValueNow: row.company_value_now,
        companyTrend: mapTrendSlopeToDirection(row.company_trend_slope),
        marketTrend: mapTrendSlopeToDirection(row.market_trend_slope),
        bestCompanyPrice: row.best_price_30_days,
        worstCompanyPrice: row.worst_price_30_days,
      }));

    return result;
  }

  /**
   * Fetches a summary of companies in a given market.
   * This method returns basic company details such as name and market information.
   *
   * @param marketId - The ID of the market to filter companies by.
   * @returns A list of companies along with their respective market details.
   */
  fetchCompaniesSummary(marketId: number) {
    return this.companyRepo.find({
      relations: { market: true },
      select: { id: true, name: true, market: { id: true, name: true } },
      where: !Number.isNaN(marketId) ? { market: { id: marketId } } : {},
    });
  }

  /**
   * Fetches detailed information about a specific company by its ID.
   * This method retrieves the company's latest price, trend, and price history
   * over the past 30 days.
   *
   * @param companyId - The ID of the company to retrieve information for.
   * @returns Detailed company information including price trends, market data, and history.
   * @throws NotFoundException if the company with the specified ID is not found.
   */
  async fetchCompanyById(companyId: number) {
    const thirtyDaysAgo = getDateDaysAgo(30);
    const sevenDaysAgo = getDateDaysAgo(7);

    const queryBuilder = this.companyRepo
      .createQueryBuilder('c')
      .select([
        'c.id AS company_id',
        'c.name AS company_name',
        'm.id AS market_id',
        'm.name AS market_name',
        'c.description AS company_description',
        // Latest price (using subquery for the latest price)
        '(SELECT price FROM company_price p WHERE p.company_id = c.id ORDER BY p.date DESC LIMIT 1) AS company_current_price',
        // Company trend over the last 7 days (using regression slope)
        `(SELECT REGR_SLOPE(cp.price, cp.row_number)
          FROM (
            SELECT price, ROW_NUMBER() OVER (ORDER BY date) AS row_number
            FROM company_price cp
            WHERE cp.company_id = c.id AND date >= :sevenDaysAgo
          ) AS cp) AS company_trend_slope`,
        // Array of prices with date in the last 30 days, using JSONB
        `(SELECT jsonb_agg(jsonb_build_object('date', cp.date, 'price', cp.price) ORDER BY cp.date DESC)
          FROM company_price cp 
          WHERE cp.company_id = c.id AND cp.date >= :thirtyDaysAgo) AS prices_last_30_days`,
      ])
      .leftJoin('c.market', 'm')
      .where('c.id = :companyId', { companyId })
      .setParameters({
        thirtyDaysAgo,
        sevenDaysAgo,
      });

    const rawResult = await queryBuilder.getRawOne();

    if (!rawResult) {
      throw new NotFoundException('Company not found');
    }

    const result = {
      companyId: rawResult.company_id,
      companyName: rawResult.company_name,
      marketId: rawResult.market_id,
      marketName: rawResult.market_name,
      companyDescription: rawResult.company_description,
      companyCurrentPrice: rawResult.company_current_price,
      companyTrend: mapTrendSlopeToDirection(rawResult.company_trend_slope),
      pricesLast30Days: rawResult.prices_last_30_days || [],
    };

    return result;
  }
}
