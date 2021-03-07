import ActionUtility from '../../utils/ActionUtility';
import * as LocalEffect from './LocalEffect';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import ToastsAction from '../toasts/ToastsAction';
import { ToastStatusEnum, LocalEnum } from '../../constants';

export default class LocalAction {
  static REQUEST_LOCAL = 'LocalAction.REQUEST_LOCAL';
  static REQUEST_LOCAL_FINISHED = 'LocalAction.REQUEST_LOCAL_FINISHED';

  static getLocals() {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(dispatch, LocalAction.REQUEST_LOCAL, LocalEffect.requestLocals);
    };
  }
  static REQUEST_LOCAL_BY_LODGING = 'LocalAction.REQUEST_LOCAL_BY_LODGING';
  static REQUEST_LOCAL_BY_LODGING_FINISHED = 'LocalAction.REQUEST_LOCAL_BY_LODGING_FINISHED';

  static getLocalByLodging() {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        LocalAction.REQUEST_LOCAL_BY_LODGING,
        LocalEffect.requestLocalsByLocalType,
        LocalEnum.Lodging
      );
    };
  }

  static REQUEST_LOCAL_BY_WORKSHOP = 'LocalAction.REQUEST_LOCAL_BY_WORKSHOP';
  static REQUEST_LOCAL_BY_WORKSHOP_FINISHED = 'LocalAction.REQUEST_LOCAL_BY_WORKSHOP_FINISHED';
  static getLocalByWorkshop() {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        LocalAction.REQUEST_LOCAL_BY_WORKSHOP,
        LocalEffect.requestLocalsByLocalType,
        LocalEnum.Workshop
      );
    };
  }

  static REQUEST_LOCAL_BY_KITCHEN = 'LocalAction.REQUEST_LOCAL_BY_KITCHEN';
  static REQUEST_LOCAL_BY_KITCHEN_FINISHED = 'LocalAction.REQUEST_LOCAL_BY_KITCHEN_FINISHED';
  static getLocalByKitchen() {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        LocalAction.REQUEST_LOCAL_BY_KITCHEN,
        LocalEffect.requestLocalsByLocalType,
        LocalEnum.Kitchen
      );
    };
  }

  static REQUEST_LOCAL_BY_MEMBER_ID = 'LocalAction.REQUEST_LOCAL_BY_MEMBER_ID';
  static REQUEST_LOCAL_BY_MEMBER_ID_FINISHED = 'LocalAction.REQUEST_LOCAL_BY_MEMBER_ID_FINISHED';

  static getLocalsByMemberId(id) {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        LocalAction.REQUEST_LOCAL_BY_MEMBER_ID,
        LocalEffect.requestLocalsByMemberId,
        id
      );
    };
  }

  static REQUEST_LOCAL_UPDATE = 'LocalAction.REQUEST_LOCAL_UPDATE';
  static REQUEST_LOCAL_UPDATE_FINISHED = 'LocalAction.REQUEST_LOCAL_UPDATE_FINISHED';
  static updateLocal(local, user) {
    return async (dispatch, getState) => {
      const response = await ActionUtility.createThunkEffect(
        dispatch,
        LocalAction.REQUEST_LOCAL_UPDATE,
        LocalEffect.requestUpdateLocal,
        local,
        user
      );
      if (!(response instanceof HttpErrorResponseModel)) {
        dispatch(ToastsAction.add('Se ha editado un local', ToastStatusEnum.Success));
      }
    };
  }

  static REQUEST_LOCAL_BY_ID = 'LocalAction.REQUEST_LOCAL_BY_ID';
  static REQUEST_LOCAL_BY_ID_FINISHED = 'LocalAction.REQUEST_LOCAL_BY_ID_FINISHED';
  static getLocalById(id) {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        LocalAction.REQUEST_LOCAL_BY_ID,
        LocalEffect.requestLocalById,
        id
      );
    };
  }

  static REQUEST_LOCAL_DELETE = 'LocalAction.REQUEST_LOCAL_DELETE';
  static REQUEST_LOCAL_DELETE_FINISHED = 'LocalAction.REQUEST_LOCAL_DELETE_FINISHED';

  static deleteLocal(id) {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        LocalAction.REQUEST_LOCAL_DELETE,
        LocalEffect.requestDeleteLocal,
        id
      );
    };
  }

  static REQUEST_LOCAL_DELETE_MULTIMEDIA_BY_ID = 'LocalAction.REQUEST_LOCAL_DELETE_MULTIMEDIA_BY_ID';
  static REQUEST_LOCAL_DELETE_MULTIMEDIA_BY_ID_FINISHED = 'LocalAction.REQUEST_LOCAL_DELETE_MULTIMEDIA_BY_ID_FINISHED';

  static deleteLocalMultimediaById(id, idMultimedia) {
    debugger;
    return async (dispatch, getState) => {
      const response = await ActionUtility.createThunkEffect(
        dispatch,
        LocalAction.REQUEST_LOCAL_DELETE_MULTIMEDIA_BY_ID,
        LocalEffect.requestDeleteLocalMultimediaById,
        id,
        idMultimedia
      );
      if (!(response instanceof HttpErrorResponseModel)) {
        dispatch(ToastsAction.add('Se ha eliminado una imagen', ToastStatusEnum.Success));
      }
    };
  }

  static REQUEST_LOCAL_WITH_USER_CREATE = 'LocalAction.REQUEST_LOCAL_WITH_USER_CREATE';
  static REQUEST_LOCAL_WITH_USER_CREATE_FINISHED = 'LocalAction.REQUEST_LOCAL_WITH_USER_CREATE_FINISHED';

  static createLocalWithUser(local, user) {
    return async (dispatch, getState) => {
      const response = await ActionUtility.createThunkEffect(
        dispatch,
        LocalAction.REQUEST_LOCAL_WITH_USER_CREATE,
        LocalEffect.requestCreateLocalWithUser,
        local,
        user
      );
      if (!(response instanceof HttpErrorResponseModel)) {
        dispatch(ToastsAction.add('Se ha creado un local', ToastStatusEnum.Success));
      }
    };
  }

  static REQUEST_LOCAL_CREATE = 'LocalAction.REQUEST_LOCAL_CREATE';
  static REQUEST_LOCAL_CREATE_FINISHED = 'LocalAction.REQUEST_LOCAL_CREATE_FINISHED';

  static createLocal(local) {
    return async (dispatch, getState) => {
      const response = await ActionUtility.createThunkEffect(
        dispatch,
        LocalAction.REQUEST_LOCAL_CREATE,
        LocalEffect.requestCreateLocal,
        local
      );
      if (!(response instanceof HttpErrorResponseModel)) {
        dispatch(ToastsAction.add('Se ha creado un local', ToastStatusEnum.Success));
      }
    };
  }
}
