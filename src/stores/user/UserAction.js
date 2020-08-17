import ActionUtility from '../../utils/ActionUtility';
import UserEffect from './UserEffect';
import AuthService from '../../services/AuthService';

export default class UserAction {
  static REQUEST_USER = 'UserAction.REQUEST_USER';
  static REQUEST_USER_FINISHED = 'ArticleAction.REQUEST_USER_FINISHED';

  static getUsers(filter = 'all') {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(dispatch, UserAction.REQUEST_USER, UserEffect.requestUser, filter);
    };
  }

  static REQUEST_USER_LOGIN = 'UserAction.REQUEST_USER_LOGIN';
  static REQUEST_USER_LOGIN_FINISHED = 'UserAction.REQUEST_USER_LOGIN_FINISHED';
  static login(email, password) {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        UserAction.REQUEST_USER_LOGIN,
        UserEffect.requestLogin,
        email,
        password
      );
      UserAction.verifyLogin(dispatch);
    };
  }

  static verifyLogin = dispatch => {
    if (AuthService.loggedIn()) {
      const { token, ...rest } = AuthService.getProfile().user_data;
      dispatch(UserAction.changeAuth({ authenticated: true, ...rest }));
    } else {
      dispatch(UserAction.changeAuth({ authenticated: false }));
    }
  };

  static REQUEST_USER_UPDATE = 'UserAction.REQUEST_USER_UPDATE';
  static REQUEST_USER_UPDATE_FINISHED = 'UserAction.REQUEST_USER_UPDATE_FINISHED';
  static updateUser(user) {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        UserAction.REQUEST_USER_UPDATE,
        UserEffect.requestUpdateUser,
        user
      );
    };
  }

  static REQUEST_USER_DELETE = 'UserAction.REQUEST_USER_DELETE';
  static REQUEST_USER_DELETE_FINISHED = 'UserAction.REQUEST_USER_DELETE_FINISHED';

  static deleteUser(id) {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(dispatch, UserAction.REQUEST_USER_DELETE, UserEffect.requestDeleteUser, id);
    };
  }

  static REQUEST_USER_CREATE = 'UserAction.REQUEST_USER_CREATE';
  static REQUEST_USER_CREATE_FINISHED = 'UserAction.REQUEST_USER_CREATE_FINISHED';

  static createPerson(user, history) {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        UserAction.REQUEST_USER_CREATE,
        UserEffect.requestCreateUser,
        user
      );
      history.push('/');
    };
  }

  static USER_AUTHENTICATED = 'AuthAction.AUTH_AUTHENTICATED';

  static changeAuth(auth) {
    return ActionUtility.createAction(UserAction.USER_AUTHENTICATED, { ...auth });
  }
  static USER_LOGOUT = 'AuthAction.AUTH_LOGOUT';

  static logout() {
    return ActionUtility.createAction(UserAction.USER_LOGOUT, {});
  }
}
