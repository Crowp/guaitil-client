import { Request } from '../../../utils/requests/Request';
import { createProductReviewsRequestCommand } from './commands/ProductReviewsRequestCommand';

export class ProductReviewsRequest extends Request {
  constructor(query = '') {
    super();
    this.ProductReviewsRequestCommand = createProductReviewsRequestCommand(query);
  }

  onRequest = async () => {
    return await this.ProductReviewsRequestCommand.executeRequest();
  };
}

export const createProductReviewsRequest = (query = '') => {
  return new ProductReviewsRequest(query);
};
