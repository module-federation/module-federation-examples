const moment = require("moment");
const Dates = require("../types/dates");

function getDateWithFormat(date, format) {
  let days;

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

function getRandomTextString(symbolsQuantity) {
  return _getRandomString(symbolsQuantity);
}

function getRandomIntegerString(stringLength) {
  return _getRandomString(stringLength, '1'.charCodeAt(0), '9'.charCodeAt(0));
}

function _getRandomString(stringLength, from = 97, to = 122) {
  return Array.from({ length: stringLength }, () =>
      String.fromCharCode(Math.floor(Math.random() * (to - from) + from)),
  ).join('');
}

module.exports = {
  getDateWithFormat,
  getRandomTextString,
  getRandomIntegerString
}