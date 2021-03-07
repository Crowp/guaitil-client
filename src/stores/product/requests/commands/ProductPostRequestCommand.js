import environment from 'environment';
import { RollbackRequestCommand } from '../../../../utils/requests/commands/RollbackRequestCommand';

import ProductModel from '../../../../models/ProductModel';
import * as EffectUtility from '../../../../utils/EffectUtility';
import { createProductDeleteRequestCommand } from './ProductDeleteRequestCommand';

export class ProductPostRequestCommand extends RollbackRequestCommand {
  constructor(product) {
    super();
    this.product = product;
  }
  executeRequest = async () => {
    const endpoint = environment.api.products.replace(':id', '');
    const response = await EffectUtility.postToModel(ProductModel, endpoint, this.product);
    this.ifResponseIsNotValidThrowsError(response);
    this.id = response.id;
    return response;
  };

  addMultimediaBeforeRequest = (files = []) => {
    this.product.multimedia = [...files];
  };

  rollback = async () => {
    if (this.isExecuted) {
      const id = this.id;
      return await createProductDeleteRequestCommand(id).executeRequest();
    }
  };
}

export const createProductPostRequestCommand = local => {
  return new ProductPostRequestCommand(local);
};
