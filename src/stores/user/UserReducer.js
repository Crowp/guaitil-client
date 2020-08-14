import UserAction from './UserAction';
import BaseReducer from '../../utils/BaseReducer';

export default class PersonReducer extends BaseReducer {
  initialState = [];

  [UserAction.REQUEST_USER_FINISHED](state, action) {
    return [...action.payload];
  }
  [UserAction.REQUEST_USER_UPDATE_FINISHED](state, action) {
    return [...action.payload];
  }
  [PersonAction.REQUEST_USER_DELETE_FINISHED](state, action) {
    const id = action.payload;
    return [...state.filter(model => model.id !== id)];
  }
  [UserAction.REQUEST_USER_CREATE_FINISHED](state, action) {
    const user = action.payload;
    return [user, ...state];
  }
}
