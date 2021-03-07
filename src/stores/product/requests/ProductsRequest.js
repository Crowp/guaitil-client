import { Request } from '../../../utils/requests/Request';
import { createProductsRequestCommand } from './commands/ProductsRequestCommand';

export class ProductsRequest extends Request {
  constructor(query = '') {
    super();
    this.ProductsRequestCommand = createProductsRequestCommand(query);
  }

  onRequest = async () => {
    return await this.ProductsRequestCommand.executeRequest();
  };
}

export const createProductsRequest = (query = '') => {
  return new ProductsRequest(query);
};
