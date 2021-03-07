import environment from 'environment';
import { RequestCommand } from '../../../../utils/requests/commands/RequestCommand';

import ProductReviewModel from '../../../../models/ProductReviewModel';
import * as EffectUtility from '../../../../utils/EffectUtility';

export class ProductReviewPutRequestCommand extends RequestCommand {
  constructor(productReview) {
    super();
    this.productReview = productReview;
  }
  executeRequest = async () => {
    const endpoint = environment.api.productReviews.replace(':id', '');
    const response = await EffectUtility.putToModel(ProductReviewModel, endpoint, this.productReview);
    this.ifResponseIsNotValidThrowsError(response);
    return response;
  };
}

export const createProductReviewPutRequestCommand = productReview => {
  return new ProductReviewPutRequestCommand(productReview);
};
