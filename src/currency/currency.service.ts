import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { getCurrency as localeToCurrencyCode } from 'locale-currency';
import { ExchangeRate } from 'src/entities/exchange-rate.entity';
import { getCurrencySymbol } from 'src/utils/get-currency-symbol.util';
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
  /**
   * Fetches exchange rates from an external API and stores them in the database.
   * This method is scheduled to run every day at midnight.
   */
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

  /**
   * Converts an array of prices from USD to the target currency based on the locale or a specified currency.
   * @param prices - The array of prices in USD.
   * @param locale - The locale to determine the target currency.
   * @param preferableTargetCurrency - The preferred target currency.
   * @returns The array of converted prices with the currency symbol.
   */
  async convertPrices(
    prices: number[],
    locale: string,
    preferableTargetCurrency: string | undefined,
  ) {
    const target = preferableTargetCurrency || localeToCurrencyCode(locale);

    try {
      if (target === 'USD') {
        throw new Error();
      }
      const exchangeRateEntity = await this.exchangeRateRepository.findOne({
        where: { targetCurrency: target },
      });

      if (!exchangeRateEntity) {
        throw new Error();
      }

      const rate = exchangeRateEntity.rate;
      const symbol = getCurrencySymbol(target);
      return prices.map((price) => {
        const convertedPrice = price * rate;
        return `${symbol} ${convertedPrice.toFixed(2)}`;
      });
    } catch (e) {
      console.error(
        `Error converting price currency, error code: `,
        e?.message,
      );

      return prices.map((price) => `$ ${price.toFixed(2)}`);
    }
  }

  /**
   * Converts a price history from USD to the target currency based on the locale or a specified currency.
   * @param history - The price history with dates and prices in USD.
   * @param locale - The locale to determine the target currency.
   * @param preferableTargetCurrency - The preferred target currency.
   * @returns The converted price history with the currency symbol.
   */
  async convertPriceHistory(
    history: { date: string; price: number }[],
    locale: string,
    preferableTargetCurrency: string | undefined,
  ) {
    const target = preferableTargetCurrency || localeToCurrencyCode(locale);

    try {
      if (target === 'USD') {
        throw new Error();
      }
      const exchangeRateEntity = await this.exchangeRateRepository.findOne({
        where: { targetCurrency: target },
      });

      if (!exchangeRateEntity) {
        throw new Error();
      }

      const rate = exchangeRateEntity.rate;
      const symbol = getCurrencySymbol(target);
      return history.map((item) => {
        const convertedPrice = item.price * rate;
        return {
          ...item,
          price: `${symbol} ${convertedPrice.toFixed(2)}`,
        };
      });
    } catch (e) {
      console.error(
        `Error converting price currency, error code: `,
        e?.message,
      );

      return history.map((item) => ({
        ...item,
        price: `$ ${item.price.toFixed(2)}`,
      }));
    }
  }
}
