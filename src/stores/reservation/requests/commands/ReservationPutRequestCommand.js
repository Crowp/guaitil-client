import environment from 'environment';
import { RequestCommand } from '../../../../utils/requests/commands/RequestCommand';

import ReservationModel from '../../../../models/ReservationModel';
import * as EffectUtility from '../../../../utils/EffectUtility';

export class ReservationPutRequestCommand extends RequestCommand {
  constructor(reservation) {
    super();
    this.reservation = reservation;
  }
  executeRequest = async () => {
    const endpoint = environment.api.reservations.replace(':id', this.reservation.id);
    const response = await EffectUtility.putToModel(ReservationModel, endpoint, this.reservation);
    this.ifResponseIsNotValidThrowsError(response);
    return response;
  };
}

export const createReservationPutRequestCommand = reservation => {
  return new ReservationPutRequestCommand(reservation);
};
