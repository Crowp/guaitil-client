import ActionUtility from '../../utils/ActionUtility';
import * as UserEffect from './UserEffect';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import ToastsAction from '../toasts/ToastsAction';
import { ToastStatusEnum } from '../../constants';

export default class UserAction {
  static REQUEST_USER = 'UserAction.REQUEST_USER';
  static REQUEST_USER_FINISHED = 'UserAction.REQUEST_USER_FINISHED';

  static getUsers() {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(dispatch, UserAction.REQUEST_USER, UserEffect.requestUsers);
    };
  }

  static REQUEST_USER_ADMINS = 'UserAction.REQUEST_USER_ADMINS';
  static REQUEST_USER_ADMINS_FINISHED = 'UserAction.REQUEST_USER_ADMINS_FINISHED';

  static getUsersAdmin() {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(dispatch, UserAction.REQUEST_USER, UserEffect.requestUsersAdmins);
    };
  }

  static REQUEST_USER_UPDATE_PASSWORD = 'UserAction.REQUEST_USER_UPDATE_PASSWORD';
  static REQUEST_USER_UPDATE_PASSWORD_FINISHED = 'UserAction.REQUEST_USER_UPDATE_PASSWORD_FINISHED';
  static updateUserPassword(id, password) {
    return async (dispatch, getState) => {
      const response = await ActionUtility.createThunkEffect(
        dispatch,
        UserAction.REQUEST_USER_UPDATE_PASSWORD,
        UserEffect.resetPassword,
        id,
        password
      );
      if (!(response instanceof HttpErrorResponseModel)) {
        dispatch(ToastsAction.add('Se ha editado un administrador', ToastStatusEnum.Success));
      }
    };
  }

  static REQUEST_USER_UPDATE_ROLES = 'UserAction.REQUEST_USER_UPDATE_ROLES';
  static REQUEST_USER_UPDATE_ROLES_FINISHED = 'UserAction.REQUEST_USER_UPDATE_ROLES_FINISHED';
  static updateUserRoles(id, roles) {
    return async (dispatch, getState) => {
      const response = await ActionUtility.createThunkEffect(
        dispatch,
        UserAction.REQUEST_USER_UPDATE_ROLES,
        UserEffect.requestUpdateUserRoles,
        id,
        roles
      );
      if (!(response instanceof HttpErrorResponseModel)) {
        dispatch(ToastsAction.add('Se ha editado un administrador', ToastStatusEnum.Success));
      }
    };
  }

  static REQUEST_USER_BY_ID = 'UserAction.REQUEST_USER_BY_ID';
  static REQUEST_USER_BY_ID_FINISHED = 'UserAction.REQUEST_USER_BY_ID_FINISHED';
  static getUserById(id) {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(dispatch, UserAction.REQUEST_USER_BY_ID, UserEffect.requestUserById, id);
    };
  }

  static REQUEST_USER_BY_MEMBER_ID = 'UserAction.REQUEST_USER_BY_MEMBER_ID';
  static REQUEST_USER_BY_MEMBER_ID_FINISHED = 'UserAction.REQUEST_USER_BY_MEMBER_ID_FINISHED';
  static getUserByMemberId(id) {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        UserAction.REQUEST_USER_BY_MEMBER_ID,
        UserEffect.requestUserByMemberId,
        id
      );
    };
  }

  static REQUEST_USER_DELETE = 'UserAction.REQUEST_USER_DELETE';
  static REQUEST_USER_DELETE_FINISHED = 'UserAction.REQUEST_USER_DELETE_FINISHED';

  static deleteUser(id) {
    return async (dispatch, getState) => {
      const response = await ActionUtility.createThunkEffect(
        dispatch,
        UserAction.REQUEST_USER_DELETE,
        UserEffect.requestDeleteUser,
        id
      );
      if (!(response instanceof HttpErrorResponseModel)) {
        dispatch(ToastsAction.add('Se ha eliminado un administrador', ToastStatusEnum.Success));
      }
    };
  }

  static REQUEST_USER_CREATE = 'UserAction.REQUEST_USER_CREATE';
  static REQUEST_USER_CREATE_FINISHED = 'UserAction.REQUEST_USER_CREATE_FINISHED';

  static createUser(user) {
    return async (dispatch, getState) => {
      const response = await ActionUtility.createThunkEffect(
        dispatch,
        UserAction.REQUEST_USER_CREATE,
        UserEffect.requestCreateUser,
        user
      );
      if (!(response instanceof HttpErrorResponseModel)) {
        dispatch(ToastsAction.add('Se ha creado un administrador', ToastStatusEnum.Success));
      }
    };
  }
}
