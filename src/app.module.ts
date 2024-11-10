import { Module } from '@nestjs/common';
import { CompanyModule } from './company/company.module';
import { MarketModule } from './market/market.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './typeorm.config';
import { ScheduleModule } from '@nestjs/schedule';
import { DataSyncModule } from './data-sync/data-sync.module';

@Module({
  imports: [
    CompanyModule,
    MarketModule,
    TypeOrmModule.forRoot(AppDataSource.options),
    ScheduleModule.forRoot(),
    DataSyncModule,
  ],
})
export class AppModule {}
