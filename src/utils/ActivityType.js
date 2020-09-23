import { ActivityEnum } from '../constants';

export const getActivityType = activityType => {
  let typeName = '';
  switch (activityType) {
    case ActivityEnum.Tour:
      typeName = 'Tour';
      break;
    case ActivityEnum.Experience:
      typeName = 'Vivencia';
      break;
    default:
      typeName = 'No definido';
  }
  return typeName;
};
