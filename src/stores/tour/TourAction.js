import ActionUtility from '../../utils/ActionUtility';
import * as TourEffect from './TourEffect';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import ToastsAction from '../toasts/ToastsAction';
import { ToastStatusEnum } from '../../constants';

export default class TourAction {
  static REQUEST_TOUR = 'TourAction.REQUEST_TOUR';
  static REQUEST_TOUR_FINISHED = 'TourAction.REQUEST_TOUR_FINISHED';

  static getTours() {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(dispatch, TourAction.REQUEST_TOUR, TourEffect.requestTours);
    };
  }

  static REQUEST_TOUR_UPDATE = 'TourAction.REQUEST_TOUR_UPDATE';
  static REQUEST_TOUR_UPDATE_FINISHED = 'TourAction.REQUEST_TOUR_UPDATE_FINISHED';
  static updateTour(local) {
    console.log(local);
    return async (dispatch, getState) => {
      const response = await ActionUtility.createThunkEffect(
        dispatch,
        TourAction.REQUEST_TOUR_UPDATE,
        TourEffect.requestUpdateTour,
        local
      );
      if (!(response instanceof HttpErrorResponseModel)) {
        dispatch(ToastsAction.add('Se a editado un tour', ToastStatusEnum.Success));
      }
    };
  }

  static REQUEST_REQUEST_TOUR_BY_ID = 'TourAction.REQUEST_TOUR_BY_ID';
  static REQUEST_REQUEST_TOUR_BY_ID_FINISHED = 'TourAction.REQUEST_TOUR_BY_ID_FINISHED';
  static getTourById(id) {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        TourAction.REQUEST_REQUEST_TOUR_BY_ID,
        TourEffect.requestTourById,
        id
      );
    };
  }

  static REQUEST_TOUR_DELETE = 'TourAction.REQUEST_TOUR_DELETE';
  static REQUEST_TOUR_DELETE_FINISHED = 'TourAction.REQUEST_TOUR_DELETE_FINISHED';

  static deleteTour(id) {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(dispatch, TourAction.REQUEST_TOUR_DELETE, TourEffect.requestDeleteTour, id);
    };
  }

  static REQUEST_TOUR_CREATE = 'TourAction.REQUEST_TOUR_CREATE';
  static REQUEST_TOUR_CREATE_FINISHED = 'TourAction.REQUEST_TOUR_CREATE_FINISHED';

  static createTour(local) {
    return async (dispatch, getState) => {
      const response = await ActionUtility.createThunkEffect(
        dispatch,
        TourAction.REQUEST_TOUR_CREATE,
        TourEffect.requestCreateTour,
        local
      );
      if (!(response instanceof HttpErrorResponseModel)) {
        dispatch(ToastsAction.add('Se a creado un tour', ToastStatusEnum.Success));
      }
    };
  }
}
