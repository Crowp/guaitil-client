import { createSelector } from 'reselect';
import { ActivityEnum } from '../../constants';
import { getActivityType } from '../../utils/ActivityType';
import moment from 'moment';

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

  static selectActivitiesClient(activities) {
    return ActivitySelector._createTableRowsClient(activities);
  }

  static _createTableRowsClient(models) {
    return models.map(model => {
      const date = moment(model.activityDate);
      const month = date.format('MMM');
      const day = date.format('DD');
      return {
        id: model.id,
        calendar: { month, day },
        organizer: 'Organizado por la Asociación',
        additional: model.address.physicalAddress,
        title: model.name,
        location: 'En Guaitil',
        to: `/actividades/individual/${model.id}`
      };
    });
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

export const selectActivitiesClient = createSelector(
  state => state.activities,
  ActivitySelector.selectActivitiesClient
);
