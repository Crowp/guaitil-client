import environment from 'environment';
import { RequestCommand } from '../../../../utils/requests/commands/RequestCommand';

import ProductReviewModel from '../../../../models/ProductReviewModel';
import * as EffectUtility from '../../../../utils/EffectUtility';

export class ProductReviewsRequestCommand extends RequestCommand {
  constructor(query = '') {
    super();
    this.query = query;
  }
  executeRequest = async () => {
    const endpoint = environment.api.productReviews.replace(':id', this.query);
    return await EffectUtility.getToModel(ProductReviewModel, endpoint);
  };
}

export const createProductReviewsRequestCommand = query => {
  return new ProductReviewsRequestCommand(query);
};
