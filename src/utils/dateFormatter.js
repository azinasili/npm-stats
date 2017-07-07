import moment from 'moment';

const dateToYear = date => moment(date).format('YYYY');
const dateToMonth = date => moment(date).format('MMMM YYYY');
const dateToWeek = date => moment(date).format('GGGG-[W]WW');
const dateToDay = date => moment(date).format('YYYY-MM-DD');
const dateBeautify = date => moment(date).format('Do MMMM YYYY');

export {
  dateToYear,
  dateToMonth,
  dateToWeek,
  dateToDay,
  dateBeautify,
};
