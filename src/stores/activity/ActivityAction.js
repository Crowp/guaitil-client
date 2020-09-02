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
        dispatch(ToastsAction.add('Se a creado una actividad', ToastStatusEnum.Success));
      }
    };
  }

  static REQUEST_ACTIVITY_CREATE_WHIT_TOUR = 'ActivityAction.REQUEST_ACTIVITY_CREATE_WHIT_TOUR';
  static REQUEST_ACTIVITY_CREATE_WHIT_TOUR_FINISHED = 'ActivityAction.REQUEST_ACTIVITY_CREATE_WHIT_TOUR_FINISHED';

  static createActivityAndTour(activity, tour) {
    return async (dispatch, getState) => {
      const response = await ActionUtility.createThunkEffect(
        dispatch,
        ActivityAction.REQUEST_ACTIVITY_CREATE_WHIT_TOUR,
        ActivityEffect.requestCreateActivity,
        activity,
        tour
      );
      if (!(response instanceof HttpErrorResponseModel)) {
        dispatch(ToastsAction.add('Se a creado una actividad', ToastStatusEnum.Success));
      }
    };
  }
}
