import { RollbackRequest } from '../../../utils/requests/RollbackRequest';
import { createProductFilesPutRequest } from '../../product/requests/ProductFilesPutRequest';
import { createProductReviewPutRequest } from './ProductReviewPutRequest';

export class ProductReviewProductFilesPutRequest extends RollbackRequest {
  constructor(productReview) {
    super();
    this.productFilesPutRequest = createProductFilesPutRequest(productReview.product);
    this.productReviewPutRequest = createProductReviewPutRequest(productReview);
  }

  onRequest = async () => {
    await this.productFilesPutRequest.onRequest();
    return await this.productReviewPutRequest.onRequest();
  };

  onRollback = async () => {
    await this.productFilesPutRequest.onRollback();
  };
}

export const createProductReviewProductFilesPutRequest = productReview => {
  return new ProductReviewProductFilesPutRequest(productReview);
};
