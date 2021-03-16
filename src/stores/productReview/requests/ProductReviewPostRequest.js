import { RollbackRequest } from '../../../utils/requests/RollbackRequest';
import { createProductReviewPostRequestCommand } from './commands/ProductReviewPostRequestCommand';

export class ProductReviewPostRequest extends RollbackRequest {
  constructor(productReview) {
    super();
    this.ProductReviewPostRequestCommand = createProductReviewPostRequestCommand(productReview);
  }

  onRequest = async () => {
    return await this.ProductReviewPostRequestCommand.executeRequest();
  };

  onRollback = async () => {
    await this.ProductReviewPostRequestCommand.rollback();
  };
}

export const createProductReviewPostRequest = productReview => {
  return new ProductReviewPostRequest(productReview);
};
