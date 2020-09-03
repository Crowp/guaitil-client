import ActionUtility from '../../utils/ActionUtility';
import ToastsAction from '../toasts/ToastsAction';
import AuthEffect from './AuthEffect';
import ToastStatusEnum from '../../constants/ToastStatusEnum';
import AuthService from '../../services/AuthService';

export default class AuthAction {
  static REQUEST_AUTH_LOGIN = 'AuthAction.REQUEST_AUTH_LOGIN';
  static REQUEST_AUTH_LOGIN_FINISHED = 'AuthAction.REQUEST_AUTH_LOGIN_FINISHED';
  static login(email, password) {
    return async (dispatch, getState) => {
      const { authenticated } = await ActionUtility.createThunkEffect(
        dispatch,
        AuthAction.REQUEST_AUTH_LOGIN,
        AuthEffect.requestLogin,
        email,
        password
      );
      if (authenticated) {
        dispatch(ToastsAction.add(`Se ha logeado con: ${email}`, ToastStatusEnum.Success));
      }
    };
  }

  static REQUEST_AUTH_VERIFY_LOGIN = 'AuthAction.REQUEST_AUTH_VERIFY_LOGIN';
  static REQUEST_AUTH_VERIFY_LOGIN_FINISHED = 'AuthAction.REQUEST_AUTH_VERIFY_LOGIN_FINISHED';
  static verifyLogin = () => {
    return async (dispatch, getState) => {
      const {
        auth: { authenticated }
      } = getState();
      await ActionUtility.createThunkEffect(
        dispatch,
        AuthAction.REQUEST_AUTH_VERIFY_LOGIN,
        AuthEffect.requestVerifyLogin,
        authenticated
      );
    };
  };

  static REQUEST_AUTH_UPDATE = 'AuthAction.REQUEST_AUTH_UPDATE';
  static REQUEST_AUTH_UPDATE_FINISHED = 'AuthAction.REQUEST_AUTH_UPDATE_FINISHED';
  static updateUser(user) {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        AuthAction.REQUEST_AUTH_UPDATE,
        AuthEffect.requestUpdateUser,
        user
      );
    };
  }

  static USER_AUTHENTICATED = 'AuthAction.USER_AUTHENTICATED';
  static changeAuth(auth) {
    return ActionUtility.createAction(AuthAction.USER_AUTHENTICATED, { ...auth });
  }

  static USER_LOGOUT = 'AuthAction.AUTH_LOGOUT';
  static logout() {
    AuthService.logout();
    return ActionUtility.createAction(AuthAction.USER_LOGOUT, {});
  }
}
