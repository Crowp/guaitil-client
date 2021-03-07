import environment from 'environment';
import { RollbackRequestCommand } from '../../../../utils/requests/commands/RollbackRequestCommand';

import ReservationModel from '../../../../models/ReservationModel';
import * as EffectUtility from '../../../../utils/EffectUtility';
import { createReservationDeleteRequestCommand } from './ReservationDeleteRequestCommand';

export class ReservationPostRequestCommand extends RollbackRequestCommand {
  constructor(reservation) {
    super();
    this.reservation = reservation;
  }
  executeRequest = async () => {
    const endpoint = environment.api.reservations.replace(':id', '');
    const response = await EffectUtility.postToModel(ReservationModel, endpoint, this.reservation);
    this.ifResponseIsNotValidThrowsError(response);
    this.id = response.id;
    return response;
  };

  rollback = async () => {
    if (this.isExecuted) {
      const id = this.id;
      return await createReservationDeleteRequestCommand(id).executeRequest();
    }
  };
}

export const createReservationPostRequestCommand = reservation => {
  return new ReservationPostRequestCommand(reservation);
};
