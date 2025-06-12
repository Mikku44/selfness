export function parsePercentage(value: string): number {
  return parseInt(value.replace("%", ""), 10) || 0;
}
