import ActionUtility from '../../utils/ActionUtility';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import ToastsAction from '../toasts/ToastsAction';
import { ToastStatusEnum } from '../../constants';

import * as ActivityEffect from './ActivityEffect';

export default class ActivityAction {
  static REQUEST_ACTIVITY = 'ActivityAction.REQUEST_ACTIVITY';
  static REQUEST_ACTIVITY_FINISHED = 'ActivityAction.REQUEST_ACTIVITY_FINISHED';

  static getActivities() {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        ActivityAction.REQUEST_ACTIVITY,
        ActivityEffect.requestActivities
      );
    };
  }
  static REQUEST_ACTIVITIES_REPORT_PDF = 'ActivityAction.REQUEST_ACTIVITIES_REPORT_PDF';

  static getActivitiesReportPdf() {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        ActivityAction.REQUEST_ACTIVITIES_REPORT_PDF,
        ActivityEffect.requestActivitiesReportPdf
      );
    };
  }
  static REQUEST_ACTIVITIES_REPORT_EXCEL = 'ActivityAction.REQUEST_ACTIVITIES_REPORT_EXCEL';
  static getActivitiesReportExcel() {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        ActivityAction.REQUEST_ACTIVITIES_REPORT_EXCEL,
        ActivityEffect.requestActivitiesReportExcel
      );
    };
  }

  static REQUEST_ACTIVITY_ACTIVE = 'ActivityAction.REQUEST_ACTIVITY_ACTIVE';
  static REQUEST_ACTIVITY_ACTIVE_FINISHED = 'ActivityAction.REQUEST_ACTIVITY_ACTIVE_FINISHED';

  static getActivitiesActive() {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        ActivityAction.REQUEST_ACTIVITY_ACTIVE,
        ActivityEffect.requestActivitiesActive
      );
    };
  }

  static REQUEST_ACTIVITY_SHOW = 'LocalAction.REQUEST_ACTIVITY_SHOW';
  static REQUEST_ACTIVITY_SHOW_FINISHED = 'LocalAction.REQUEST_ACTIVITY_SHOW_FINISHED';
  static onShowActivity(id) {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        ActivityAction.REQUEST_ACTIVITY_SHOW,
        ActivityEffect.requestOnShowActivity,
        id
      );
    };
  }

  static REQUEST_ACTIVITY_BY_ID = 'ActivityAction.REQUEST_ACTIVITY_BY_ID';
  static REQUEST_ACTIVITY_BY_ID_FINISHED = 'ActivityAction.REQUEST_ACTIVITY_BY_ID_FINISHED';
  static getActivityById(id) {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        ActivityAction.REQUEST_ACTIVITY_BY_ID,
        ActivityEffect.requestActivityById,
        id
      );
    };
  }

  static REQUEST_ACTIVITY_UPDATE = 'ActivityAction.REQUEST_ACTIVITY_UPDATE';
  static REQUEST_ACTIVITY_UPDATE_FINISHED = 'ActivityAction.REQUEST_ACTIVITY_UPDATE_FINISHED';
  static updateActivity(activity) {
    return async (dispatch, getState) => {
      const response = await ActionUtility.createThunkEffect(
        dispatch,
        ActivityAction.REQUEST_ACTIVITY_UPDATE,
        ActivityEffect.requestUpdateActivity,
        activity
      );
      if (!(response instanceof HttpErrorResponseModel)) {
        dispatch(ToastsAction.add('Se ha editado una actividad', ToastStatusEnum.Success));
      }
    };
  }

  static REQUEST_ACTIVITY_DELETE = 'ActivityAction.REQUEST_ACTIVITY_DELETE';
  static REQUEST_ACTIVITY_DELETE_FINISHED = 'ActivityAction.REQUEST_ACTIVITY_DELETE_FINISHED';

  static deleteActivity(id) {
    return async (dispatch, getState) => {
      const response = await ActionUtility.createThunkEffect(
        dispatch,
        ActivityAction.REQUEST_ACTIVITY_DELETE,
        ActivityEffect.requestDeleteActivity,
        id
      );
      if (!(response instanceof HttpErrorResponseModel)) {
        dispatch(ToastsAction.add('Se ha eliminado una actividad', ToastStatusEnum.Success));
      }
    };
  }

  static REQUEST_ACTIVITY_DELETE_MULTIMEDIA_BY_ID = 'ActivityAction.REQUEST_ACTIVITY_DELETE_MULTIMEDIA_BY_ID';
  static REQUEST_ACTIVITY_DELETE_MULTIMEDIA_BY_ID_FINISHED =
    'ActivityAction.REQUEST_ACTIVITY_DELETE_MULTIMEDIA_BY_ID_FINISHED';

  static deleteActivityMultimediaById(id, idMultimedia) {
    return async (dispatch, getState) => {
      const response = await ActionUtility.createThunkEffect(
        dispatch,
        ActivityAction.REQUEST_ACTIVITY_DELETE_MULTIMEDIA_BY_ID,
        ActivityEffect.requestDeleteActivityMultimediaById,
        id,
        idMultimedia
      );
      if (!(response instanceof HttpErrorResponseModel)) {
        dispatch(ToastsAction.add('Se ha eliminado una imagen', ToastStatusEnum.Success));
      }
    };
  }

  static REQUEST_ACTIVITY_CREATE = 'ActivityAction.REQUEST_ACTIVITY_CREATE';
  static REQUEST_ACTIVITY_CREATE_FINISHED = 'ActivityAction.REQUEST_ACTIVITY_CREATE_FINISHED';

  static createActivity(activity) {
    return async (dispatch, getState) => {
      const response = await ActionUtility.createThunkEffect(
        dispatch,
        ActivityAction.REQUEST_ACTIVITY_CREATE,
        ActivityEffect.requestCreateActivity,
        activity
      );
      if (!(response instanceof HttpErrorResponseModel)) {
        dispatch(ToastsAction.add('Se ha creado una actividad', ToastStatusEnum.Success));
      }
    };
  }
}
