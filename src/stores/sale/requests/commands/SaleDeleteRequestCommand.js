import environment from 'environment';
import { RequestCommand } from '../../../../utils/requests/commands/RequestCommand';

import SaleModel from '../../../../models/SaleModel';
import * as EffectUtility from '../../../../utils/EffectUtility';

export class SaleDeleteRequestCommand extends RequestCommand {
  constructor(query) {
    super();
    this.query = query;
  }
  executeRequest = async () => {
    const endpoint = environment.api.sales.replace(':id', this.query);
    return await EffectUtility.deleteToModel(SaleModel, endpoint);
  };
}

export const createSaleDeleteRequestCommand = query => {
  return new SaleDeleteRequestCommand(query);
};
