import ActionUtility from '../../utils/ActionUtility';
import * as ReservationEffect from './ReservationEffect';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import ToastsAction from '../toasts/ToastsAction';
import { ToastStatusEnum } from '../../constants';

export default class ReservationAction {
  static REQUEST_RESERVATION = 'ReservationAction.REQUEST_RESERVATION';
  static REQUEST_RESERVATION_FINISHED = 'ReservationAction.REQUEST_RESERVATION_FINISHED';

  static getReservations() {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        ReservationAction.REQUEST_RESERVATION,
        ReservationEffect.requestReservations
      );
    };
  }

  static REQUEST_RESERVATION_UPDATE = 'ReservationAction.REQUEST_RESERVATION_UPDATE';
  static REQUEST_RESERVATION_UPDATE_FINISHED = 'ReservationAction.REQUEST_RESERVATION_UPDATE_FINISHED';

  static updateReservation(reservation) {
    return async (dispatch, getState) => {
      const response = await ActionUtility.createThunkEffect(
        dispatch,
        ReservationAction.REQUEST_RESERVATION_UPDATE,
        ReservationEffect.requestUpdateReservation,
        reservation
      );
      if (!(response instanceof HttpErrorResponseModel)) {
        dispatch(ToastsAction.add('Se a editado una reservacion', ToastStatusEnum.Success));
      }
    };
  }

  static REQUEST_RESERVATION_BY_ID = 'ReservationAction.REQUEST_RESERVATION_BY_ID';
  static REQUEST_RESERVATION_BY_ID_FINISHED = 'ReservationAction.REQUEST_RESERVATION_BY_ID_FINISHED';
  static getReservationById(id) {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        ReservationAction.REQUEST_RESERVATION_BY_ID,
        ReservationEffect.requestReservationById,
        id
      );
    };
  }

  static REQUEST_RESERVATION_DELETE = 'ReservationAction.REQUEST_RESERVATION_DELETE';
  static REQUEST_RESERVATION_DELETE_FINISHED = 'ReservationAction.REQUEST_RESERVATION_DELETE_FINISHED';

  static deleteReservation(id) {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        ReservationAction.REQUEST_RESERVATION_DELETE,
        ReservationEffect.requestDeleteReservation,
        id
      );
    };
  }

  static REQUEST_RESERVATION_CREATE = 'ReservationAction.REQUEST_RESERVATION_CREATE';
  static REQUEST_RESERVATION_CREATE_FINISHED = 'ReservationAction.REQUEST_RESERVATION_CREATE_FINISHED';

  static createReservation(reservation) {
    return async (dispatch, getState) => {
      const response = await ActionUtility.createThunkEffect(
        dispatch,
        ReservationAction.REQUEST_RESERVATION_CREATE,
        ReservationEffect.requestCreateReservation,
        reservation
      );
      if (!(response instanceof HttpErrorResponseModel)) {
        dispatch(ToastsAction.add('Se a creado una reservacion', ToastStatusEnum.Success));
      }
    };
  }
}
