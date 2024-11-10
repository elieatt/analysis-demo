export function getDateDaysAgo(days: number): string {
  return new Date(new Date().setDate(new Date().getDate() - days))
    .toISOString()
    .split('T')[0];
}
