import environment from 'environment';
import { RequestCommand } from '../../../../utils/requests/commands/RequestCommand';

import ProductModel from '../../../../models/ProductModel';
import * as EffectUtility from '../../../../utils/EffectUtility';

export class ProductsRequestCommand extends RequestCommand {
  constructor(query = '') {
    super();
    this.query = query;
  }
  executeRequest = async () => {
    const endpoint = environment.api.products.replace(':id', this.query);
    return await EffectUtility.getToModel(ProductModel, endpoint, this.local);
  };
}

export const createProductsRequestCommand = query => {
  return new ProductsRequestCommand(query);
};
