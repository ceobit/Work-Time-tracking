export const formatDate = date => {
  return date < 10 ? `0${date}` : date;
}