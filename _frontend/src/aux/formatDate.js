import moment from 'moment';

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