import moment from 'moment';

// settings
import { DATE_FORMAT } from '../settings';

export function durationToMinutes (value) {
  const dateTime = moment(value);
  const format = dateTime.hours() > 60 ? 'DD:hh:mm:ss' : dateTime.minutes() > 60 ? 'hh:mm:ss' : 'mm:ss';

  // set date by UTC !!!
  dateTime.utc();
  return dateTime.format(format);
}

export function replaceStringURL (urlStr = '', replacedValue, newValue) {
  return urlStr.replace(replacedValue, newValue);
}

export function dateTimeFormat (date, format = DATE_FORMAT) {
  return moment(date).format(format);
}