import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Market } from './market.entity';

@Entity()
export class MarketPrice {
  @PrimaryColumn()
  market_id: number;

  @ManyToOne(() => Market, (market) => market.prices)
  @JoinColumn({ name: 'market_id' })
  market: Market;

  @PrimaryColumn('date')
  date: string;

  @Column('float')
  price: number;
}
