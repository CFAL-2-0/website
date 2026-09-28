const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

export function formatDate(date: Date): string {
  return dateFormatter.format(date);
}

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function yearRange(start?: number, end?: number): string | undefined {
  if (!start && !end) return undefined;
  if (start && !end) return `${start}–present`;
  if (!start) return `–${end}`;
  return start === end ? `${start}` : `${start}–${end}`;
}
