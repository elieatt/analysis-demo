import { TrendDirection } from 'src/common/enums/trend-direction.enum';

export function mapTrendSlopeToDirection(slope: number): TrendDirection {
  if (slope >= 0) return TrendDirection.Upward;
  if (slope < 0) return TrendDirection.Downward;
}
