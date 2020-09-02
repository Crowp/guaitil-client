import TourAction from './TourAction';
import BaseReducer from '../../utils/BaseReducer';

export default class TourReducer extends BaseReducer {
  initialState = [];

  [TourAction.REQUEST_TOUR](state, action) {
    return [...action.payload];
  }

  [TourAction.REQUEST_TOUR_UPDATE_FINISHED](state, action) {
    const local = action.payload;
    return [local, ...state.filter(model => model.id !== local.id)];
  }

  [TourAction.REQUEST_TOUR_DELETE_FINISHED](state, action) {
    const id = action.payload;
    return [...state.filter(model => model.id !== id)];
  }

  [TourAction.REQUEST_TOUR_CREATE_FINISHED](state, action) {
    const local = action.payload;
    return [local, ...state];
  }

  [TourAction.REQUEST_REQUEST_TOUR_BY_ID_FINISHED](state, action) {
    const local = action.payload;
    return [local, ...state];
  }
}
