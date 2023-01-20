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

export function getRandomTextString(symbolsQuantity: number,): string {
  return _getRandomString(symbolsQuantity);
}

export function getRandomIntegerString(stringLength: number): string {
  return _getRandomString(stringLength, '1'.charCodeAt(0), '9'.charCodeAt(0));
}

function _getRandomString(stringLength: number, from: number = 97, to: number = 122): string {
  return Array.from({ length: stringLength }, () =>
      String.fromCharCode(Math.floor(Math.random() * (to - from) + from)),
  ).join('');
}