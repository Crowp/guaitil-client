import UserAction from './UserAction';
import BaseReducer from '../../utils/BaseReducer';

export default class UserReducer extends BaseReducer {
  initialState = [];

  [UserAction.REQUEST_USER_FINISHED](state, action) {
    return [...action.payload];
  }
  [UserAction.REQUEST_USER_ADMINS_FINISHED](state, action) {
    return [...action.payload];
  }

  [UserAction.REQUEST_USER_UPDATE_PASSWORD_FINISHED](state, action) {
    const user = action.payload;
    return [user, ...state.filter(model => model.id !== user.id)];
  }

  [UserAction.REQUEST_USER_UPDATE_ROLES_FINISHED](state, action) {
    const user = action.payload;
    return [user, ...state.filter(model => model.id !== user.id)];
  }

  [UserAction.REQUEST_USER_BY_ID_FINISHED](state, action) {
    const user = action.payload;
    return [user, ...state.filter(model => model.id !== user.id)];
  }

  [UserAction.REQUEST_USER_DELETE_FINISHED](state, action) {
    const id = action.payload;
    return [...state.filter(model => model.id !== id)];
  }

  [UserAction.REQUEST_USER_CREATE_FINISHED](state, action) {
    const user = action.payload;
    return [user, ...state];
  }

  [UserAction.REQUEST_USER_BY_ID_FINISHED](state, action) {
    const user = action.payload;
    return [user, ...state.filter(model => model.id !== user.id)];
  }

  [UserAction.REQUEST_USER_BY_MEMBER_ID_FINISHED](state, action) {
    const user = action.payload;
    return [user, ...state.filter(model => model.id !== user.id)];
  }
}
