import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/entities/company.entity';
import { CurrencyModule } from 'src/currency/currency.module';

@Module({
  imports: [TypeOrmModule.forFeature([Company]), CurrencyModule],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
