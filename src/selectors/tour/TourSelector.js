import { createSelector } from 'reselect';

class TourSelector {
  static selectTours(tours) {
    return TourSelector._createTableRows(tours);
  }

  static _createTableRows(models) {
    return models.map(({ activity, ...model }) => ({
      id: model.id,
      amountPerson: model.amountPerson,
      name: activity.name,
      description: activity.description,
      activityType: activity.activityType
    }));
  }
  static _tourToOptionRows(models) {
    return models.map(({ activity, ...model }) => ({
      value: model.id,
      label: activity.name
    }));
  }
  static selectTourToOptions(tours) {
    return TourSelector._tourToOptionRows(tours);
  }
}

export default TourSelector;

export const selectTours = createSelector(
  state => state.tours,
  TourSelector.selectTours
);

export const selectToursOptions = createSelector(
  state => state.tours,
  TourSelector.selectTourToOptions
);
