import { Module } from '@nestjs/common';
import { CompanyModule } from './company/company.module';
import { MarketModule } from './market/market.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './typeorm.config';
import { ScheduleModule } from '@nestjs/schedule';
import { DataSyncModule } from './data-sync/data-sync.module';
import { CurrencyModule } from './currency/currency.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.dev`,
    }),
    CompanyModule,
    MarketModule,
    TypeOrmModule.forRoot(AppDataSource.options),
    ScheduleModule.forRoot(),
    DataSyncModule,
    CurrencyModule,
  ],
})
export class AppModule {}
