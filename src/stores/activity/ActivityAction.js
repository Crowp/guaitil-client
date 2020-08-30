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

  static REQUEST_ACTIVITY_UPDATE = 'ActivityAction.REQUEST_ACTIVITY_UPDATE';
  static REQUEST_ACTIVITY_UPDATE_FINISHED = 'ActivityAction.REQUEST_ACTIVITY_UPDATE_FINISHED';
  static updateActivity(activity) {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        ActivityAction.REQUEST_ACTIVITY_UPDATE,
        ActivityEffect.requestUpdateActivity,
        activity
      );
    };
  }

  static REQUEST_ACTIVITY_DELETE = 'ActivityAction.REQUEST_ACTIVITY_DELETE';
  static REQUEST_ACTIVITY_DELETE_FINISHED = 'ActivityAction.REQUEST_ACTIVITY_DELETE_FINISHED';

  static deleteActivity(id) {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        ActivityAction.REQUEST_ACTIVITY_DELETE,
        ActivityEffect.requestDeleteActivity,
        id
      );
    };
  }

  static REQUEST_ACTIVITY_CREATE = 'ActivityAction.REQUEST_ACTIVITY_CREATE';
  static REQUEST_ACTIVITY_CREATE_FINISHED = 'ActivityAction.REQUEST_ACTIVITY_CREATE_FINISHED';

  static createActivity(person) {
    return async (dispatch, getState) => {
      const response = await ActionUtility.createThunkEffect(
        dispatch,
        ActivityAction.REQUEST_ACTIVITY_CREATE,
        ActivityEffect.requestCreateActivity,
        person
      );
      if (!(response instanceof HttpErrorResponseModel)) {
        dispatch(ToastsAction.add('Se a creado una actividad', ToastStatusEnum.Success));
      }
    };
  }
}
