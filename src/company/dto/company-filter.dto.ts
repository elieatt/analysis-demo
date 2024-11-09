import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { TrendDirection } from 'src/common/enums/trend-direction.enum';
export class CompanyFilterDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  @Transform(({ value }) => parseInt(value))
  marketId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(TrendDirection)
  companyTrend: TrendDirection;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(TrendDirection)
  marketTrend: TrendDirection;
}
