import { Request } from '../../../utils/requests/Request';
import { createProductReviewDeleteRequestCommand } from './commands/ProductReviewDeleteRequestCommand';

export class ProductReviewDeleteRequest extends Request {
  constructor(query) {
    super();
    this.productReviewDeleteRequestCommand = createProductReviewDeleteRequestCommand(query);
  }

  onRequest = async () => {
    return await this.productReviewDeleteRequestCommand.executeRequest();
  };
}

export const createProductReviewDeleteRequest = query => {
  return new ProductReviewDeleteRequest(query);
};
