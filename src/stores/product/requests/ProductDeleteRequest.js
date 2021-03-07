import { Request } from '../../../utils/requests/Request';
import { createProductDeleteRequestCommand } from './commands/ProductDeleteRequestCommand';

export class ProductDeleteRequest extends Request {
  constructor(query) {
    super();
    this.ProductDeleteRequestCommand = createProductDeleteRequestCommand(query);
  }

  onRequest = async () => {
    return await this.ProductDeleteRequestCommand.executeRequest();
  };
}

export const createProductDeleteRequest = query => {
  return new ProductDeleteRequest(query);
};
