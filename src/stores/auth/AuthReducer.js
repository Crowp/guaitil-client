import AuthAction from './AuthAction';
import BaseReducer from '../../utils/BaseReducer';

export default class AuthReducer extends BaseReducer {
  initialState = { authenticated: false };

  [AuthAction.REQUEST_AUTH_VERIFY_LOGIN_FINISHED](state, action) {
    return { ...action.payload };
  }

  [AuthAction.REQUEST_AUTH_LOGIN_FINISHED](state, action) {
    return { ...action.payload };
  }

  [AuthAction.USER_LOGOUT](state, action) {
    return { ...action.payload };
  }
}
