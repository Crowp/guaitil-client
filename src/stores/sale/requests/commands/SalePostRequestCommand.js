import environment from 'environment';
import { RollbackRequestCommand } from '../../../../utils/requests/commands/RollbackRequestCommand';

import SaleModel from '../../../../models/SaleModel';
import * as EffectUtility from '../../../../utils/EffectUtility';
import { createSaleDeleteRequestCommand } from './SaleDeleteRequestCommand';

export class SalePostRequestCommand extends RollbackRequestCommand {
  constructor(reservation) {
    super();
    this.reservation = reservation;
  }
  executeRequest = async () => {
    const endpoint = environment.api.sales.replace(':id', '');
    const response = await EffectUtility.postToModel(SaleModel, endpoint, this.reservation);
    this.ifResponseIsNotValidThrowsError(response);
    this.id = response.id;
    return response;
  };

  rollback = async () => {
    if (this.isExecuted) {
      const id = this.id;
      return await createSaleDeleteRequestCommand(id).executeRequest();
    }
  };
}

export const createSalePostRequestCommand = local => {
  return new SalePostRequestCommand(local);
};
