import moment from 'moment';

export function durationToMinutes(value) {
  const dateTime = moment(value);
  const format = dateTime.hours() > 60 ? 'DD:hh:mm:ss' : dateTime.minutes() > 60 ? 'hh:mm:ss' : 'mm:ss';

  // set date by UTC !!!
  dateTime.utc();
  return dateTime.format(format);
}

export function replaceStringURL(urlStr = '', replacedValue, newValue) {
  return urlStr.replace(replacedValue, newValue);
}