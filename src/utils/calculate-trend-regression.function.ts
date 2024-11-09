import { TrendDirection } from 'src/common/enums/trend-direction.enum';

export function calculateTrendRegression(prices: number[]): TrendDirection {
  if (prices.length < 2) {
    throw new Error('Not enough data points to calculate the trend.');
  }

  const n = prices.length;
  const xValues: number[] = Array.from({ length: n }, (_, i) => i + 1); // Days as x values [1, 2, ..., n]

  // Calculate sums for x, y, xy, and x^2
  const sumX = xValues.reduce((sum, x) => sum + x, 0);
  const sumY = prices.reduce((sum, y) => sum + y, 0);
  const sumXY = xValues.reduce((sum, x, i) => sum + x * prices[i], 0);
  const sumX2 = xValues.reduce((sum, x) => sum + x * x, 0);

  // Calculate the slope (m)
  const numerator = n * sumXY - sumX * sumY;
  const denominator = n * sumX2 - sumX * sumX;
  const slope = numerator / denominator;

  // Determine trend based on the slope
  if (slope > 0.5) return TrendDirection.Upward; // Adjust threshold as needed
  if (slope < -0.5) return TrendDirection.Downward;
  return TrendDirection.Stable;
}
export function mapTrendSlopeToDirection(slope: number): TrendDirection {
  if (slope > 0.5) return TrendDirection.Upward; // Adjust threshold as needed
  if (slope < -0.5) return TrendDirection.Downward;
  return TrendDirection.Stable;
}
