import { createSelector } from 'reselect';
import { ActivityEnum, RouteMap } from '../../constants';
import { getActivityType } from '../../utils/ActivityType';
import moment from 'moment';
import { sortActivityByUpdateAtDate } from '../../utils/sortByUpdateAtDate';

class ActivitySelector {
  static filterTours = activities =>
    activities.filter(activity => activity.activityDescription.activityType !== ActivityEnum.Experience);
  static selectTours(activities) {
    return ActivitySelector._createTableRows(ActivitySelector.filterTours(activities));
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
      const date = moment(model.activityDescription.activityDate);
      const month = date.format('MMM');
      const day = date.format('DD');
      return {
        id: model.id,
        calendar: { month, day },
        organizer: 'Asociación integral de Guaitil',
        additional: model.activityDescription.address.physicalAddress,
        title: model.activityDescription.name,
        location: 'En Guaitil',
        to: RouteMap.Home.activityIndivitual(model.id)
      };
    });
  }

  static _createTableRows(models) {
    const activitiesSorted = sortActivityByUpdateAtDate(models);
    return activitiesSorted.map(model => ({
      id: model.id,
      name: model.activityDescription.name,
      description: model.activityDescription.description,
      activityDate: model.activityDescription.activityDate,
      activityType: getActivityType(model.activityDescription.activityType),
      address: model.activityDescription.address.physicalAddress,
      show: model.isActive
    }));
  }

  static _ActivityToOptionRows(models) {
    return models.map(({ id, name }) => ({
      value: id,
      label: name
    }));
  }

  static _ActivityDescriptionToOptionRows(models) {
    return models.map(({ activityDescription: { name, id } }) => ({
      value: id,
      label: name
    }));
  }

  static selectActivityDescriptionToOptions(activities) {
    return ActivitySelector._ActivityDescriptionToOptionRows(ActivitySelector.filterTours(activities));
  }

  static selectActiviyToOptions(activities) {
    return ActivitySelector._ActivityToOptionRows(ActivitySelector.selectTours(activities));
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

export const selectActiviyToOptions = createSelector(
  state => state.activities,
  ActivitySelector.selectActiviyToOptions
);
export const selectActiviyDescriptionToOptions = createSelector(
  state => state.activities,
  ActivitySelector.selectActivityDescriptionToOptions
);
