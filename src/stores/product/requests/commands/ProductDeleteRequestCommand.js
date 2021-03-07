import environment from 'environment';
import { RequestCommand } from '../../../../utils/requests/commands/RequestCommand';

import ProductModel from '../../../../models/ProductModel';
import * as EffectUtility from '../../../../utils/EffectUtility';

export class ProductDeleteRequestCommand extends RequestCommand {
  constructor(query) {
    super();
    this.query = query;
  }
  executeRequest = async () => {
    const endpoint = environment.api.products.replace(':id', this.query);
    return await EffectUtility.deleteToModel(ProductModel, endpoint);
  };
}

export const createProductDeleteRequestCommand = query => {
  return new ProductDeleteRequestCommand(query);
};
