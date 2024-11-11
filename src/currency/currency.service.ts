import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { ExchangeRate } from 'src/entities/exchange-rate.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CurrencyService implements OnModuleInit {
  constructor(
    @InjectRepository(ExchangeRate)
    private exchangeRateRepository: Repository<ExchangeRate>,
    private readonly configService: ConfigService,
  ) {}
  async onModuleInit() {
    await this.fetchAndStoreExchangeRates();
  }
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async fetchAndStoreExchangeRates() {
    const apiUrl = this.configService.getOrThrow<string>(
      'EXCHANGE_RATES_API_URL',
    );
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const rates = data.rates;
      const exchangeRates: ExchangeRate[] = [];
      for (const [currency, rate] of Object.entries(rates)) {
        exchangeRates.push(
          this.exchangeRateRepository.create({
            targetCurrency: currency,
            rate: rate as number,
          }),
        );
      }
      await this.exchangeRateRepository.manager.transaction(async (manager) => {
        await manager.save(ExchangeRate, exchangeRates);
      });
    } catch (error) {
      console.error('Error fetching exchange rates:', error?.message);
    }
  }
}
