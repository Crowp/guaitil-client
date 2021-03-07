import { Request } from '../../../utils/requests/Request';
import { createProductReviewPutRequestCommand } from './commands/ProductReviewPutRequestCommand';

export class ProductReviewPutRequest extends Request {
  constructor(local) {
    super();
    this.ProductReviewPutRequestCommand = createProductReviewPutRequestCommand(local);
  }

  onRequest = async () => {
    return await this.ProductReviewPutRequestCommand.executeRequest();
  };
}

export const createProductReviewPutRequest = local => {
  return new ProductReviewPutRequest(local);
};
