import moment from 'moment';
import {useCallback} from 'react';

export const formatDate = objDate => {
  const obj = {};
  for (let [key, value] of Object.entries(objDate)) {
    value < 10 ? obj[key] = `0${value}` : obj[key] = value;
  }
  return `${obj.hours}:${obj.minutes}:${obj.seconds}`;
}

export const dateToString = date => {
  if (moment(date).format("DD.MM.YYYY") === moment(new Date()).format("DD.MM.YYYY")) {
    return 'Today'
  }
  return moment(date).format("DD.MM.YYYY");
}

export const checkDate = (date, dateFrom, dateTo) => {
  if (dateFrom && dateTo) {
    return Date.parse(date.created_at.slice(0, 10)) >= Date.parse(dateFrom) && Date.parse(date.created_at.slice(0, 10)) <= Date.parse(dateTo);
  }

  if (dateFrom && !dateTo) {
    return Date.parse(date.created_at.slice(0, 10)) >= Date.parse(dateFrom);
  }

  if (!dateFrom && dateTo) {
    return Date.parse(date.created_at.slice(0, 10)) <= Date.parse(dateTo);
  }
}

export const getTotalTime = (arr) => {
  const durations = arr.map(a => a.duration);
  let seconds = durations.reduce((acc, cur) => (acc+= +cur.slice(-2), acc),0);
  const minutes = durations.reduce((acc, cur) => (acc+= +cur.slice(4,5), acc),0);
  const hours = durations.reduce((acc, cur) => (acc+= +cur.slice(0,2), acc),0);
  seconds += minutes / 60 + hours / 3600;
  return moment.utc(seconds*1000).format('HH:mm:ss');
}

export const calculate = (activeTime) => {
  let {hours, minutes, seconds} = activeTime;
  seconds++;
  if (seconds === 60) {
    minutes++;
    seconds = 0;
  }
  if (minutes === 60) {
    hours++;
    minutes = 0;
  }
  return {...activeTime, hours: hours, minutes: minutes, seconds: seconds};
}