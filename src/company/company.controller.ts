import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CompanyService } from './company.service';

import { CompanyFilterDto } from './dto/company-filter.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  getAllCompanies(@Query() filterDto: CompanyFilterDto) {
    return this.companyService.fetchAllCompanies(filterDto);
  }
  @Get('/summary')
  @ApiQuery({
    name: 'marketId',
    required: false,
    type: Number,
  })
  getCompaniesSummary(@Query('marketId') marketId: string) {
    return this.companyService.fetchCompaniesSummary(parseInt(marketId));
  }

  @Get(':id')
  async getCompanyById(@Param('id', ParseIntPipe) id: number) {
    return this.companyService.fetchCompanyById(id);
  }
}
