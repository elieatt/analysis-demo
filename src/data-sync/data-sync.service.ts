import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/entities/company.entity';
import { MarketPrice } from 'src/entities/market-price.entity';
import { Market } from 'src/entities/market.entity';
import { Repository } from 'typeorm';
import {
  fetchMarkets,
  fetchCompaniesPrices,
  fetchCompanies,
  fetchMarketsPrices,
} from '../super-market-api';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CompanyPrice } from 'src/entities/company-price.entity';
@Injectable()
export class DataSyncService implements OnModuleInit {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
    @InjectRepository(CompanyPrice)
    private readonly companyPriceRepo: Repository<CompanyPrice>,
    @InjectRepository(Market) private readonly marketRepo: Repository<Market>,
    @InjectRepository(MarketPrice)
    private readonly marketPriceRepo: Repository<MarketPrice>,
  ) {}
  /**
   * Called once the module is initialized. Starts the initial database synchronization.
   * @async
   * @method
   */
  async onModuleInit() {
    await this.syncDB();
  }

  /**
   * Synchronizes data between the application and SUPER_MARKET API.
   * Fetches markets, companies, and their prices from the API,
   * then updates the database with this information.
   * Runs daily at midnight as defined by the Cron expression.
   * @async
   * @method
   * @returns {Promise<boolean>} - Returns true if synchronization is successful, otherwise false.
   */
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async syncDB(): Promise<boolean> {
    try {
      const markets = fetchMarkets();

      const companies = fetchCompanies();

      const marketEntities = markets.map((market) => {
        return this.marketRepo.create({
          ...market,

          prices: fetchMarketsPrices(market.id)[0].prices.map((price) => {
            return this.marketPriceRepo.create({ ...price });
          }),
        });
      });

      const companyEntities = companies.map((company) => {
        return this.companyRepo.create({
          ...company,
          market: { id: company.market },
          prices: fetchCompaniesPrices(company.id)[0].prices.map((price) => {
            return this.companyPriceRepo.create({
              ...price,
            });
          }),
        });
      });

      await this.companyRepo.manager.transaction(async (manager) => {
        await manager.save(Market, marketEntities);
        await manager.save(Company, companyEntities);
      });
      return true;
    } catch (e) {
      console.error(
        'Error fetch super market api and updating DB , error message:',
        e?.message,
      );
      return false;
    }
  }
}
