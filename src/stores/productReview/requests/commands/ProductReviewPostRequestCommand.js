import environment from 'environment';
import { RollbackRequestCommand } from '../../../../utils/requests/commands/RollbackRequestCommand';

import ProductReviewModel from '../../../../models/ProductReviewModel';
import * as EffectUtility from '../../../../utils/EffectUtility';
import { createProductReviewDeleteRequestCommand } from './ProductReviewDeleteRequestCommand';

export class ProductReviewPostRequestCommand extends RollbackRequestCommand {
  constructor(productReview) {
    super();
    this.productReview = productReview;
  }
  executeRequest = async () => {
    const endpoint = environment.api.productReviews.replace(':id', '');
    const response = await EffectUtility.postToModel(ProductReviewModel, endpoint, this.productReview);
    console.log(response);
    this.ifResponseIsNotValidThrowsError(response);
    this.id = response.id;
    return response;
  };

  rollback = async () => {
    if (this.isExecuted) {
      const id = this.id;
      return await createProductReviewDeleteRequestCommand(id).executeRequest();
    }
  };
}

export const createProductReviewPostRequestCommand = productReview => {
  return new ProductReviewPostRequestCommand(productReview);
};
