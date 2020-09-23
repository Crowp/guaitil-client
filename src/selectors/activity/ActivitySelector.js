import { createSelector } from 'reselect';
import { ActivityEnum } from '../../constants';
import { getActivityType } from '../../utils/ActivityType';

class ActivitySelector {
  static selectTours(activities) {
    return ActivitySelector._createTableRows(
      activities.filter(activity => activity.activityType !== ActivityEnum.Experience)
    );
  }

  static selectExperience(activities) {
    return ActivitySelector._createTableRows(
      activities.filter(activity => activity.activityType !== ActivityEnum.Tour)
    );
  }

  static selectAllActivities(activities) {
    return ActivitySelector._createTableRows(activities);
  }

  static _createTableRows(models) {
    return models.map(model => ({
      id: model.id,
      name: model.name,
      description: model.description,
      activityDate: model.activityDate,
      activityType: getActivityType(model.activityType),
      address: model.address.physicalAddress
    }));
  }
}
export default ActivitySelector;

export const selectTours = createSelector(
  state => state.activities,
  ActivitySelector.selectTours
);

export const selectExperience = createSelector(
  state => state.activities,
  ActivitySelector.selectExperience
);

export const selectAllActivities = createSelector(
  state => state.activities,
  ActivitySelector.selectAllActivities
);
