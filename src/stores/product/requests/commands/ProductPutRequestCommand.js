import environment from 'environment';
import { RequestCommand } from '../../../../utils/requests/commands/RequestCommand';

import ProductModel from '../../../../models/ProductModel';
import * as EffectUtility from '../../../../utils/EffectUtility';

export class ProductPutRequestCommand extends RequestCommand {
  constructor(product) {
    super();
    this.product = product;
  }
  executeRequest = async () => {
    const endpoint = environment.api.products.replace(':id', this.product.id);
    const response = await EffectUtility.putToModel(ProductModel, endpoint, this.product);
    this.ifResponseIsNotValidThrowsError(response);
    return response;
  };

  addMultimediaBeforeRequest = files => {
    if (files.length) {
      this.product.multimedia = [...files, ...this.product.multimedia];
    }
  };
}

export const createProductPutRequestCommand = product => {
  return new ProductPutRequestCommand(product);
};
