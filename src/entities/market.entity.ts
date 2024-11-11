import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { Company } from './company.entity';
import { MarketPrice } from './market-price.entity';

@Entity()
export class Market {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => MarketPrice, (marketPrice) => marketPrice.market, {
    cascade: ['insert', 'update'],
  })
  prices: MarketPrice[];

  @OneToMany(() => Company, (company) => company.market)
  companies: Company[];
}
