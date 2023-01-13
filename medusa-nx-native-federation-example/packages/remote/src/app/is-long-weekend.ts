import { format } from 'date-fns';

export function isLongWeekend(date: number | Date) {
  const weekday = format(date, 'EEE');
  return weekday === 'Mon' || weekday === 'Fri';
}
