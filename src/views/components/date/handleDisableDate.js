import moment from 'moment';

const yesterday = moment().subtract(1, 'day');

export const disablePastDt = current => {
  return current.isAfter(yesterday);
};
const today = moment();
export const disableNextDt = current => {
  return current.isBefore(today);
};
