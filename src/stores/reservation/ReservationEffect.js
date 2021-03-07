import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';

import { createReservationsRequest } from './requests/ReservationsRequest';
import { createReservationPostRequest } from './requests/ReservationPostRequest';
import { createReservationPutRequest } from './requests/ReservationPutRequest';
import { ReservationDeleteRequest } from './requests/ReservationDeleteRequest';

export const requestReservations = async () => {
  return await createReservationsRequest().getResponse();
};

export const requestReservationById = async id => {
  return await createReservationsRequest(id).getResponse();
};

export const requestUpdateReservation = async reservation => {
  return await createReservationPutRequest(reservation).getResponse();
};

export const requestCreateReservation = async reservation => {
  return await createReservationPostRequest(reservation).getResponse();
};

export const requestDeleteReservation = async id => {
  const response = await ReservationDeleteRequest(id).getResponse();
  return response instanceof HttpErrorResponseModel ? response : id;
};
