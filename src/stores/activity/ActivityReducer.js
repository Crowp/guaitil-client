import ActivityAction from './ActivityAction';
import BaseReducer from '../../utils/BaseReducer';

export default class ActivityReducer extends BaseReducer {
  initialState = [];

  [ActivityAction.REQUEST_ACTIVITY_FINISHED](state, action) {
    return [...action.payload];
  }

  [ActivityAction.REQUEST_ACTIVITY_UPDATE_FINISHED](state, action) {
    const activity = action.payload;
    return [activity, ...state.filter(model => model.id !== activity.id)];
  }

  [ActivityAction.REQUEST_ACTIVITY_DELETE_MULTIMEDIA_BY_ID_FINISHED](state, action) {
    const activity = action.payload;
    return [activity, ...state.filter(model => model.id !== activity.id)];
  }

  [ActivityAction.REQUEST_ACTIVITY_DELETE_FINISHED](state, action) {
    const id = action.payload;
    return [...state.filter(model => model.id !== id)];
  }

  [ActivityAction.REQUEST_ACTIVITY_CREATE_FINISHED](state, action) {
    const activity = action.payload;
    return [activity, ...state];
  }

  [ActivityAction.REQUEST_ACTIVITY_CREATE_WHIT_TOUR_FINISHED](state, action) {
    const activity = action.payload;
    return [activity, ...state];
  }

  [ActivityAction.REQUEST_ACTIVITY_BY_ID_FINISHED](state, action) {
    const activity = action.payload;
    return [activity, ...state];
  }
}
