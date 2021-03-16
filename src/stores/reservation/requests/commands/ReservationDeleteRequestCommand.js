import environment from 'environment';
import { RequestCommand } from '../../../../utils/requests/commands/RequestCommand';

import ReservationModel from '../../../../models/ReservationModel';
import * as EffectUtility from '../../../../utils/EffectUtility';

export class ReservationDeleteRequestCommand extends RequestCommand {
  constructor(query) {
    super();
    this.query = query;
  }
  executeRequest = async () => {
    const endpoint = environment.api.reservations.replace(':id', this.query);
    return await EffectUtility.deleteToModel(ReservationModel, endpoint);
  };
}

export const createReservationDeleteRequestCommand = query => {
  return new ReservationDeleteRequestCommand(query);
};
