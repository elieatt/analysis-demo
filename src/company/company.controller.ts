import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CompanyService } from './company.service';

import { CompanyFilterDto } from './dto/company-filter.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  // @Post()
  // create(@Body() createCompanyDto: CreateCompanyDto) {
  //   return this.companyService.create(createCompanyDto);
  // }

  @Get()
  findAll(@Query() filterDto: CompanyFilterDto) {
    return this.companyService.getCompaniesWithStats(filterDto);
  }
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.companyService.getCompanyById(id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.companyService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
  //   return this.companyService.update(+id, updateCompanyDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.companyService.remove(+id);
  // }
}
