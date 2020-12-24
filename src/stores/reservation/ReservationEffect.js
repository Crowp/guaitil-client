import environment from 'environment';
import * as EffectUtility from '../../utils/EffectUtility';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import ReservationModel from '../../models/ReservationModel';

export const requestReservations = async () => {
  const endpoint = environment.api.reservations.replace(':id', '');
  return await EffectUtility.getToModel(ReservationModel, endpoint);
};

export const requestUpdateReservation = async reservation => {
  const endpoint = environment.api.reservations.replace(':id', reservation.id);
  return await EffectUtility.putToModel(ReservationModel, endpoint, reservation);
};

export const requestCreateReservation = async reservation => {
  const endpoint = environment.api.reservations.replace(':id', '');
  return await EffectUtility.postToModel(ReservationModel, endpoint, reservation);
};
export const requestReservationById = async id => {
  const endpoint = environment.api.reservations.replace(':id', id);
  return await EffectUtility.getToModel(ReservationModel, endpoint);
};

export const requestDeleteReservation = async id => {
  const endpoint = environment.api.reservations.replace(':id', id);
  const response = await EffectUtility.deleteToModel(ReservationModel, endpoint);
  return response instanceof HttpErrorResponseModel ? response : id;
};
