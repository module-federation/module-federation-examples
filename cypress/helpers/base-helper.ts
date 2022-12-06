import moment from "moment";
import { Dates } from "../types/dates";

export function getDateWithFormat(date: string, format: string): string {
  let days: number;

  switch (date) {
    case Dates.TOMORROW:
      days = 1;
      break;
    case Dates.YESTERDAY:
      days = -1;
      break;
    case Dates.CURRENT:
      days = 0;
      break;
    case Dates.PAST:
      days = -2;
      break;
    case Dates.FUTURE:
      days = 2;
      break;
    case Dates.CURRENT_PLUS_EIGHT_DAYS:
      days = 8;
      break;
    case Dates.LAST_MONTH:
      days = -31;
      break;
    default:
      return date;
  }

  return moment().add(days, 'days').format(format);
}
