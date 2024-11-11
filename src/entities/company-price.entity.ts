import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Company } from './company.entity';

@Entity()
export class CompanyPrice {
  @PrimaryColumn()
  company_id: number;

  @ManyToOne(() => Company, (company) => company.prices)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @PrimaryColumn('date')
  date: string;

  @Column('float')
  price: number;
}
