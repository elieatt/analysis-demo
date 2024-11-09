import { Module } from '@nestjs/common';
import { DataSyncService } from './data-sync.service';
import { DataSyncController } from './data-sync.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/entities/company.entity';
import { CompanyPrice } from 'src/entities/company-price';
import { Market } from 'src/entities/market.entity';
import { MarketPrice } from 'src/entities/market-price';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company, CompanyPrice, Market, MarketPrice]),
  ],
  controllers: [DataSyncController],
  providers: [DataSyncService],
})
export class DataSyncModule {}
