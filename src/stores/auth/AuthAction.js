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
        dispatch(ToastsAction.add(`Se ha iniciado sesión con: ${email}`, ToastStatusEnum.Success));
      }
    };
  }
  static REQUEST_AUTH_REPORT_PDF = 'AuthAction.REQUEST_AUTH_REPORT_PDF';

  static getAuthReportPdf() {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        AuthAction.REQUEST_AUTH_REPORT_PDF,
        AuthEffect.requestAuthsReportPdf
      );
    };
  }

  static REQUEST_AUTH_REPORT_EXCEL = 'AuthAction.REQUEST_AUTH_REPORT_EXCEL';

  static getAuthReportExcel() {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        AuthAction.REQUEST_AUTH_REPORT_EXCEL,
        AuthEffect.requestAuthsReportExcel
      );
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
