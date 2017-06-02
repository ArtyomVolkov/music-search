export function durationToMinutes(value) {
  let minutesVal = value / 60000;
  let minutes = Math.floor(minutesVal);
  let seconds = Math.floor((minutesVal - minutes)* 60);

  return `${minutes <= 10 ? '0'+minutes : minutes}:${seconds <= 10 ? '0'+seconds : seconds}`;

}