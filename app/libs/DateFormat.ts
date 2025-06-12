export function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  const intervals: [number, string][] = [
    [60, 'Just now'],
    [60 * 60, 'm'],       // minute
    [60 * 60 * 24, 'h'],  // hour
    [60 * 60 * 24 * 7, 'd'], // day
    [60 * 60 * 24 * 30, 'w'], // week
    [60 * 60 * 24 * 365, 'mo'], // month
    [Infinity, 'y'],      // year
  ];

  if (seconds < 60) return 'Just now';

  for (let i = 1; i < intervals.length; i++) {
    const limit = intervals[i][0];
    const unit = intervals[i][1];
    const prevLimit = intervals[i - 1][0];
    if (seconds < limit) {
      const value = Math.floor(seconds / prevLimit);
      return `${value}${unit} ago`;
    }
  }

  return 'A long time ago';
}

export function formatDateString(dateStr: string): string {
  if (dateStr.length !== 8) return dateStr; // or handle error
  
  const day = dateStr.substring(0, 2);
  const month = dateStr.substring(2, 4);
  const year = dateStr.substring(4, 8);
  
  return `${day}/${month}/${year}`;
}
