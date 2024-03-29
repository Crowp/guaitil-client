import ActionUtility from '../../utils/ActionUtility';
import * as LocalEffect from './LocalEffect';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import ToastsAction from '../toasts/ToastsAction';
import { ToastStatusEnum } from '../../constants';

export default class LocalAction {
  static REQUEST_LOCAL = 'LocalAction.REQUEST_LOCAL';
  static REQUEST_LOCAL_FINISHED = 'LocalAction.REQUEST_LOCAL_FINISHED';

  static getLocals() {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(dispatch, LocalAction.REQUEST_LOCAL, LocalEffect.requestLocals);
    };
  }

  static REQUEST_LOCALS_REPORT_EXCEL = 'MemberAction.REQUEST_LOCALS_REPORT_EXCEL';

  static getLocalsReportExcel() {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        LocalAction.REQUEST_LOCALS_REPORT_EXCEL,
        LocalEffect.requestLocalsReportExcel
      );
    };
  }
  static REQUEST_LOCALS_REPORT_PDF = 'MemberAction.REQUEST_LOCALS_REPORT_PDF';

  static getLocalsReportPdf() {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        LocalAction.REQUEST_LOCALS_REPORT_PDF,
        LocalEffect.requestLocalsReportPdf
      );
    };
  }

  static REQUEST_LOCAL_BY_LOCAL_TYPE = 'LocalAction.REQUEST_LOCAL_BY_LOCAL_TYPE';
  static REQUEST_LOCAL_BY_LOCAL_TYPE_FINISHED = 'LocalAction.REQUEST_LOCAL_BY_LOCAL_TYPE_FINISHED';
  static getLocalByLocalType(localType) {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        LocalAction.REQUEST_LOCAL_BY_LOCAL_TYPE,
        LocalEffect.requestLocalsByLocalType,
        localType
      );
    };
  }

  static REQUEST_LOCAL_RESET_PASSWORD_GENERIC = 'LocalAction.REQUEST_LOCAL_RESET_PASSWORD_GENERIC';
  static REQUEST_LOCAL_RESET_PASSWORD_GENERIC_FINISHED = 'LocalAction.REQUEST_LOCAL_RESET_PASSWORD_GENERIC_FINISHED';
  static resetLocalPassword(id) {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        LocalAction.REQUEST_LOCAL_RESET_PASSWORD_GENERIC,
        LocalEffect.requestResetLocalPassword,
        id
      );
    };
  }

  static REQUEST_LOCAL_SHOW = 'LocalAction.REQUEST_LOCAL_SHOW';
  static REQUEST_LOCAL_SHOW_FINISHED = 'LocalAction.REQUEST_LOCAL_SHOW_FINISHED';
  static onShowLocal(id) {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        LocalAction.REQUEST_LOCAL_SHOW,
        LocalEffect.requestOnShowLocal,
        id
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
