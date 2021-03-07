import { Request } from '../../../utils/requests/Request';
import { createProductDeleteRequestCommand } from './commands/ProductDeleteRequestCommand';

export class ProductDeleteRequest extends Request {
  constructor(query) {
    super();
    this.productDeleteRequestCommand = createProductDeleteRequestCommand(query);
  }

  onRequest = async () => {
    return await this.productDeleteRequestCommand.executeRequest();
  };
}

export const createProductDeleteRequest = query => {
  return new ProductDeleteRequest(query);
};
