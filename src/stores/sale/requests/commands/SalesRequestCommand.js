import environment from 'environment';
import { RequestCommand } from '../../../../utils/requests/commands/RequestCommand';

import SaleModel from '../../../../models/SaleModel';
import * as EffectUtility from '../../../../utils/EffectUtility';

export class SalesRequestCommand extends RequestCommand {
  constructor(query = '') {
    super();
    this.query = query;
  }
  executeRequest = async () => {
    const endpoint = environment.api.sales.replace(':id', this.query);
    return await EffectUtility.getToModel(SaleModel, endpoint);
  };
}

export const createSalesRequestCommand = query => {
  return new SalesRequestCommand(query);
};
