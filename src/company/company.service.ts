import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/entities/company.entity';
import { Repository } from 'typeorm';
import { TrendDirection } from 'src/common/enums/trend-direction.enum';
import { CompanyFilterDto } from './dto/company-filter.dto';
import { calculateTrendRegression } from 'src/utils/calculate-trend-regression.function';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
  ) {}

  // async getCompaniesWithTrendAndPrices(
  //   filterDto: CompanyFilterDto,
  // ): Promise<any[]> {
  //   const sevenDaysAgo = new Date();
  //   sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  //   const sevenDaysAgoStr = sevenDaysAgo.toISOString().split('T')[0];

  //   const thirtyDaysAgo = new Date();
  //   thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  //   const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().split('T')[0];

  //   const query = this.companyRepo
  //     .createQueryBuilder('company')
  //     .select([
  //       'company.name AS companyName',
  //       'market.name AS marketName',
  //       // Best and worst company prices from the last 30 days
  //       'MAX(CASE WHEN companyPrice.date >= :thirtyDaysAgo THEN companyPrice.price END) AS bestCompanyPrice',
  //       'MIN(CASE WHEN companyPrice.date >= :thirtyDaysAgo THEN companyPrice.price END) AS worstCompanyPrice',
  //       // Latest company value (most recent price)
  //       '(SELECT price FROM company_price WHERE company_id = company.id AND date = :today ORDER BY date DESC LIMIT 1) AS companyValueNow',
  //       // Latest market value (most recent price)
  //       '(SELECT price FROM market_price WHERE market_id = market.id AND date = :today ORDER BY date DESC LIMIT 1) AS marketValueNow',
  //     ])
  //     .leftJoin('company.market', 'market')
  //     .leftJoin('company.prices', 'companyPrice')
  //     .leftJoin('market.prices', 'marketPrice')
  //     .where('companyPrice.date >= :sevenDaysAgo', {
  //       sevenDaysAgo: sevenDaysAgoStr,
  //     })
  //     .andWhere('marketPrice.date >= :sevenDaysAgo', {
  //       sevenDaysAgo: sevenDaysAgoStr,
  //     })
  //     .groupBy('company.id, market.id');

  //   // Linear regression calculation for company trend
  //   query.addSelect(`
  //     (SUM((companyPrice.price - AVG(companyPrice.price)) * (ROW_NUMBER() OVER (ORDER BY companyPrice.date) - 1)) /
  //     SUM(POW(ROW_NUMBER() OVER (ORDER BY companyPrice.date) - 1, 2))) AS companyTrend
  //   `);

  //   // Linear regression calculation for market trend
  //   query.addSelect(`
  //     (SUM((marketPrice.price - AVG(marketPrice.price)) * (ROW_NUMBER() OVER (ORDER BY marketPrice.date) - 1)) /
  //     SUM(POW(ROW_NUMBER() OVER (ORDER BY marketPrice.date) - 1, 2))) AS marketTrend
  //   `);

  //   // Apply filtering based on DTO fields
  //   if (filterDto.marketId) {
  //     query.andWhere('market.id = :marketId', { marketId: filterDto.marketId });
  //   }

  //   if (filterDto.companyTrend) {
  //     query.andWhere('companyTrend = :companyTrend', {
  //       companyTrend: filterDto.companyTrend,
  //     });
  //   }

  //   if (filterDto.marketTrend) {
  //     query.andWhere('marketTrend = :marketTrend', {
  //       marketTrend: filterDto.marketTrend,
  //     });
  //   }

  //   const companies = await query
  //     .setParameters({ thirtyDaysAgo: thirtyDaysAgoStr })
  //     .getRawMany();

  //   // Post-process the results to convert trends to `Up`, `Down`, `Neutral`
  //   return companies.map((company) => ({
  //     companyName: company.companyName,
  //     marketName: company.marketName,
  //     companyValueNow: parseFloat(company.companyValueNow),
  //     marketValueNow: parseFloat(company.marketValueNow),
  //     companyTrend: this.getTrendDirection(company.companyTrend),
  //     marketTrend: this.getTrendDirection(company.marketTrend),
  //     bestCompanyPrice: parseFloat(company.bestCompanyPrice),
  //     worstCompanyPrice: parseFloat(company.worstCompanyPrice),
  //   }));
  // }
  // Helper function to convert linear regression slope to trend direction
  private getTrendDirection(slope: string): TrendDirection {
    const trendSlope = parseFloat(slope);
    if (trendSlope > 0) {
      return TrendDirection.Upward;
    } else if (trendSlope < 0) {
      return TrendDirection.Downward;
    } else {
      return TrendDirection.Stable;
    }
  }
  // async getCompaniesWithStats(filter: CompanyFilterDto) {
  //   const companies = await this.companyRepo.find({
  //     where:
  //       filter.marketId !== undefined
  //         ? { market: { id: filter.marketId } }
  //         : {},
  //     cache: true,
  //     relations: ['market', 'prices', 'market.prices'],
  //   });

  //   const thirtyDaysAgo = new Date(
  //     new Date().setDate(new Date().getDate() - 30),
  //   );
  //   const sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 7));

  //   const result = companies.map((company) => {
  //     const companyPrices = company.prices;
  //     const marketPrices = company.market.prices;

  //     let bestCompanyPrice = -Infinity;
  //     let worstCompanyPrice = Infinity;
  //     const last7DaysCompanyPrices: number[] = [];
  //     const last7DaysMarketPrices: number[] = [];

  //     // Loop through all prices for the company and market in one go
  //     companyPrices.forEach((companyPrice) => {
  //       const companyPriceDate = new Date(companyPrice.date);

  //       // Check if the price is within the last 30 days
  //       if (companyPriceDate >= thirtyDaysAgo) {
  //         if (companyPrice.price > bestCompanyPrice)
  //           bestCompanyPrice = companyPrice.price;
  //         if (companyPrice.price < worstCompanyPrice)
  //           worstCompanyPrice = companyPrice.price;
  //       }

  //       // Check if the price is within the last 7 days
  //       if (companyPriceDate >= sevenDaysAgo) {
  //         last7DaysCompanyPrices.push(companyPrice.price);
  //       }
  //     });

  //     // Do the same for the market prices
  //     marketPrices.forEach((marketPrice) => {
  //       const marketDate = new Date(marketPrice.date);

  //       // Collect last 7 days market prices
  //       if (marketDate >= sevenDaysAgo) {
  //         last7DaysMarketPrices.push(marketPrice.price);
  //       }
  //     });

  //     // Calculate trends for both company and market for the last 7 days
  //     const companyTrend = calculateTrendRegression(last7DaysCompanyPrices);
  //     const marketTrend = calculateTrendRegression(last7DaysMarketPrices);

  //     return {
  //       companyName: company.name,
  //       marketName: company.market.name,
  //       companyValueNow:
  //         companyPrices.length > 0
  //           ? companyPrices[companyPrices.length - 1].price
  //           : null,
  //       companyTrend,
  //       marketTrend,
  //       bestCompanyPrice,
  //       worstCompanyPrice,
  //     };
  //   });

  //   return result;
  // }
  // async getCompaniesWithStats(filter: CompanyFilterDto) {
  //   const thirtyDaysAgo = new Date(
  //     new Date().setDate(new Date().getDate() - 30),
  //   );
  //   const sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 7));

  //   const query = `
  //     SELECT
  //   c.id AS company_id,
  //   c.name AS company_name,
  //   m.name AS market_name,
  //   -- Latest price
  //   (SELECT price FROM company_price p WHERE p.company_id = c.id ORDER BY p.date DESC LIMIT 1) AS company_value_now,
  //   -- Best and worst prices in the last 30 days
  //   MAX(CASE WHEN p.date >= $1 THEN p.price END) AS best_price_30_days,
  //   MIN(CASE WHEN p.date >= $1 THEN p.price END) AS worst_price_30_days,
  //   -- Last 7 days prices
  //   ARRAY_AGG(CASE WHEN p.date >= $2 THEN p.price END) AS company_last_7_days_prices,
  //   ARRAY_AGG(CASE WHEN mp.date >= $2 THEN mp.price END) AS market_last_7_days_prices
  // FROM company c
  // JOIN market m ON m.id = c."marketId" -- Correct reference to the market
  // LEFT JOIN company_price p ON p.company_id = c.id
  // LEFT JOIN market_price mp ON mp.market_id = m.id
  // WHERE ($3::INTEGER IS NULL OR m.id = $3)
  // GROUP BY c.id, m.id
  //   `;

  //   const result = await this.companyRepo.query(query, [
  //     thirtyDaysAgo,
  //     sevenDaysAgo,
  //     filter.marketId,
  //   ]);

  //   // Process the results (this is where trend calculation would happen in your app)
  //   return result.map((row) => {
  //     // Calculate trends
  //     const companyTrend = calculateTrendRegression(
  //       row.company_last_7_days_prices,
  //     );
  //     const marketTrend = calculateTrendRegression(
  //       row.market_last_7_days_prices,
  //     );

  //     return {
  //       companyName: row.company_name,
  //       marketName: row.market_name,
  //       companyValueNow: row.company_value_now,
  //       companyTrend,
  //       marketTrend,
  //       bestCompanyPrice: row.best_price_30_days,
  //       worstCompanyPrice: row.worst_price_30_days,
  //     };
  //   });
  // }

  async getCompaniesWithStats(filter: CompanyFilterDto) {
    const thirtyDaysAgo = new Date(
      new Date().setDate(new Date().getDate() - 30),
    );
    const sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 7));

    const queryBuilder = this.companyRepo
      .createQueryBuilder('c')
      .select([
        'c.id AS company_id',
        'c.name AS company_name',
        'm.name AS market_name',
        // Latest price (using subquery for the latest price)
        '(SELECT price FROM company_price p WHERE p.company_id = c.id ORDER BY p.date DESC LIMIT 1) AS company_value_now',
        // Best and worst prices in the last 30 days
        'MAX(CASE WHEN p.date >= :thirtyDaysAgo THEN p.price END) AS best_price_30_days',
        'MIN(CASE WHEN p.date >= :thirtyDaysAgo THEN p.price END) AS worst_price_30_days',
        // Last 7 days prices
        'ARRAY_AGG(CASE WHEN p.date >= :sevenDaysAgo THEN p.price END) AS company_last_7_days_prices',
        'ARRAY_AGG(CASE WHEN mp.date >= :sevenDaysAgo THEN mp.price END) AS market_last_7_days_prices',
      ])
      .leftJoin('c.market', 'm') // Joining market table
      .leftJoin('company_price', 'p', 'p.company_id = c.id') // Joining company prices
      .leftJoin('market_price', 'mp', 'mp.market_id = m.id'); // Joining market prices

    if (filter.marketId !== undefined) {
      queryBuilder.where('(m.id = :marketId)', {
        marketId: filter.marketId,
      });
    }
    queryBuilder.groupBy('c.id, m.id');

    // Passing the date parameters
    queryBuilder.setParameters({
      thirtyDaysAgo,
      sevenDaysAgo,
    });

    const result = await queryBuilder.getRawMany(); // Execute the query and return raw data

    // Process the results (this is where trend calculation would happen in your app)
    return result.map((row) => {
      // Calculate trends
      const companyTrend = calculateTrendRegression(
        row.company_last_7_days_prices,
      );
      const marketTrend = calculateTrendRegression(
        row.market_last_7_days_prices,
      );

      return {
        companyName: row.company_name,
        marketName: row.market_name,
        companyValueNow: row.company_value_now,
        companyTrend,
        marketTrend,
        bestCompanyPrice: row.best_price_30_days,
        worstCompanyPrice: row.worst_price_30_days,
      };
    });
  }
}
