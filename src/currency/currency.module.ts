import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangeRate } from 'src/entities/exchange-rate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExchangeRate])],
  providers: [CurrencyService],
})
export class CurrencyModule {}
