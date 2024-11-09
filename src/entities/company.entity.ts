import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Index,
} from "typeorm";
import { Market } from "./market.entity";
import { CompanyPrice } from "./company-price";

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => CompanyPrice, (companyPrice) => companyPrice.company, {
    cascade: ["insert", "update"],
  })
  prices: CompanyPrice[];

  @Index()
  @ManyToOne(() => Market, (market) => market.companies)
  market: Market;
}
