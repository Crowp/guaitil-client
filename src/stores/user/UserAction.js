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

  static REQUEST_USER_UPDATE = 'UserAction.REQUEST_USER_UPDATE';
  static REQUEST_USER_UPDATE_FINISHED = 'UserAction.REQUEST_USER_UPDATE_FINISHED';
  static updateUser(member) {
    return async (dispatch, getState) => {
      const response = await ActionUtility.createThunkEffect(
        dispatch,
        UserAction.REQUEST_USER_UPDATE,
        UserEffect.requestUpdateUser,
        member
      );
      if (!(response instanceof HttpErrorResponseModel)) {
        dispatch(ToastsAction.add('Se a editado un usuario', ToastStatusEnum.Success));
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

  static REQUEST_USER_DELETE = 'UserAction.REQUEST_USER_DELETE';
  static REQUEST_USER_DELETE_FINISHED = 'UserAction.REQUEST_USER_DELETE_FINISHED';

  static deleteUser(id) {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(dispatch, UserAction.REQUEST_USER_DELETE, UserEffect.requestDeleteUser, id);
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
        dispatch(ToastsAction.add('Se a creado un usuario', ToastStatusEnum.Success));
      }
    };
  }
}
