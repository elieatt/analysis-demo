import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  Index,
  PrimaryColumn,
} from 'typeorm';
import { Market } from './market.entity';
import { CompanyPrice } from './company-price.entity';

@Entity()
export class Company {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => CompanyPrice, (companyPrice) => companyPrice.company, {
    cascade: ['insert', 'update'],
  })
  prices: CompanyPrice[];

  @Index()
  @ManyToOne(() => Market, (market) => market.companies)
  market: Market;
}
