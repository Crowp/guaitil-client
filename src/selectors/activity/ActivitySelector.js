import { createSelector } from 'reselect';
import { ActivityEnum } from '../../constants';

class ActivitySelector {
  static selectTours(locals) {
    return ActivitySelector._createTableRows(
      locals.filter(activity => activity.activityType !== ActivityEnum.Experience)
    );
  }

  static selectExperience(locals) {
    return ActivitySelector._createTableRows(locals.filter(activity => activity.activityType !== ActivityEnum.Tour));
  }

  static _createTableRows(models) {
    return models.map(model => ({
      id: model.id,
      name: model.name,
      description: model.description,
      activityDate: model.activityDate,
      locals: model.locals?.length || 0,
      address: model.address.physicalAddress
    }));
  }
}
export default ActivitySelector;

export const selectTours = createSelector(
  state => state.locals,
  ActivitySelector.selectTours
);

export const selectExperience = createSelector(
  state => state.locals,
  ActivitySelector.selectExperience
);
