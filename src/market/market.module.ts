import { Module } from '@nestjs/common';
import { MarketService } from './market.service';
import { MarketController } from './market.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Market } from 'src/entities/market.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Market])],
  controllers: [MarketController],
  providers: [MarketService],
})
export class MarketModule {}
