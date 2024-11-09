import { IsInt, IsOptional, Min } from 'class-validator';
export class CompanyQueryDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  marketId?: number;
}
