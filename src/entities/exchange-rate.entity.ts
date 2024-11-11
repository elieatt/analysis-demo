import { Entity, Column, UpdateDateColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class ExchangeRate {
  @PrimaryColumn()
  targetCurrency: string;

  @Column('decimal', { precision: 15, scale: 6 })
  rate: number;

  @UpdateDateColumn()
  lastUpdated: Date;
}
