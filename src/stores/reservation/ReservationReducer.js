import ReservationAction from './ReservationAction';
import BaseReducer from '../../utils/BaseReducer';

export default class ReservationReducer extends BaseReducer {
  initialState = [];

  [ReservationAction.REQUEST_RESERVATION_FINISHED](state, action) {
    return [...action.payload];
  }
  [ReservationAction.REQUEST_RESERVATION_UPDATE_FINISHED](state, action) {
    const reservation = action.payload;
    return [reservation, ...state.filter(model => model.id !== reservation.id)];
  }
  [ReservationAction.REQUEST_RESERVATION_DELETE_FINISHED](state, action) {
    const id = action.payload;
    return [...state.filter(model => model.id !== id)];
  }

  [ReservationAction.REQUEST_RESERVATION_CREATE_FINISHED](state, action) {
    const reservation = action.payload;
    return [reservation, ...state];
  }

  [ReservationAction.REQUEST_RESERVATION_BY_ID_FINISHED](state, action) {
    const member = action.payload;
    return [member, ...state];
  }
}
