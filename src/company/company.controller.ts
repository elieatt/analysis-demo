import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import {
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiParam,
  ApiOkResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { CompanyFilterDto } from './dto/company-filter.dto';
import { CompanyDetailsDto } from './dto/company-details.dto';
import { CompanyAnalysisDto } from './dto/company-analysis.dto';
import { CompanySummaryDto } from './dto/company-summary.dto';

@ApiTags('Companies')
@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all companies with analysis',
    description: 'Retrieve a list of companies with optional filters.',
  })
  @ApiOkResponse({
    type: [CompanyAnalysisDto],
  })
  getAllCompanies(@Query() filterDto: CompanyFilterDto) {
    return this.companyService.fetchAllCompanies(filterDto);
  }
  /***********************************************************************************************************/
  @Get('/summary')
  @ApiOperation({
    summary: 'Get companies summary',
    description:
      'Retrieve a summary of companies, optionally filtered by market.',
  })
  @ApiQuery({
    name: 'marketId',
    required: false,
    type: Number,
    description: 'Market ID to filter the company summary by a specific market',
  })
  @ApiOkResponse({
    description: 'Company summary retrieved successfully.',
    type: [CompanySummaryDto],
  })
  getCompaniesSummary(@Query('marketId') marketId: string) {
    return this.companyService.fetchCompaniesSummary(parseInt(marketId));
  }
  /***********************************************************************************************************/

  @Get(':id')
  @ApiOperation({
    summary: 'Get company by ID',
    description:
      'Retrieve detailed information about a specific company by its ID.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'The unique identifier of the company.',
  })
  @ApiOkResponse({
    type: CompanyDetailsDto,
  })
  @ApiNoContentResponse({
    description: 'Company not found.',
  })
  async getCompanyById(@Param('id', ParseIntPipe) id: number) {
    return this.companyService.fetchCompanyById(id);
  }
}
