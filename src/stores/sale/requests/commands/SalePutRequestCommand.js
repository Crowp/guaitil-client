import environment from 'environment';
import { RequestCommand } from '../../../../utils/requests/commands/RequestCommand';

import SaleModel from '../../../../models/SaleModel';
import * as EffectUtility from '../../../../utils/EffectUtility';

export class SalePutRequestCommand extends RequestCommand {
  constructor(reservation) {
    super();
    this.reservation = reservation;
  }
  executeRequest = async () => {
    const endpoint = environment.api.sales.replace(':id', this.reservation.id);
    const response = await EffectUtility.putToModel(SaleModel, endpoint, this.reservation);
    this.ifResponseIsNotValidThrowsError(response);
    return response;
  };
}

export const createSalePutRequestCommand = reservation => {
  return new SalePutRequestCommand(reservation);
};
