import { RollbackRequest } from '../../../utils/requests/RollbackRequest';
import { createProductFilesPutRequest } from '../../product/requests/ProductFilesPutRequest';
import { createProductFilesByAdminUserPutRequest } from '../../product/requests/ProductFilesPutByAdminUserRequest';
import { createProductReviewPutRequest } from './ProductReviewPutRequest';

export class ProductReviewProductFilesPutRequest extends RollbackRequest {
  constructor(productReview, isAdmin) {
    super();
    if (isAdmin) {
      this.productFilesPutRequest = createProductFilesByAdminUserPutRequest(productReview.product);
    } else {
      this.productFilesPutRequest = createProductFilesPutRequest(productReview.product);
    }
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

export const createProductReviewProductFilesPutRequest = (productReview, isAdmin) => {
  return new ProductReviewProductFilesPutRequest(productReview, isAdmin);
};
