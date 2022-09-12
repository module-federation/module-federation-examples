import { format } from 'date-fns';

export function isLongWeekend(date) {
  const weekday = format(date, 'EEE');
  return weekday === 'Mon' || weekday === 'Fri';
}
