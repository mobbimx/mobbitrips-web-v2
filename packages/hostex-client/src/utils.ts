export function differenceInCalendarDays(to: string, from: string): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.max(1, Math.round((new Date(to).getTime() - new Date(from).getTime()) / msPerDay));
}

export function datesOverlap(aFrom: string, aTo: string, bFrom: string, bTo: string): boolean {
  return aFrom < bTo && aTo > bFrom;
}
