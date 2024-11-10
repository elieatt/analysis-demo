import { TrendDirection } from 'src/common/enums/trend-direction.enum';

/**
 * Determines the trend direction based on a slope value.
 */
export function mapTrendSlopeToDirection(slope: number): TrendDirection {
  return slope >= 0 ? TrendDirection.Upward : TrendDirection.Downward;
}
