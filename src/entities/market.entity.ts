import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Company } from "./company.entity";
import { MarketPrice } from "./market-price";

@Entity()
export class Market {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => MarketPrice, (marketPrice) => marketPrice.market, {
    cascade: ["insert", "update"],
  })
  prices: MarketPrice[];

  @OneToMany(() => Company, (company) => company.market)
  companies: Company[];
}
