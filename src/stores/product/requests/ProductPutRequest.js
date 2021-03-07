import { Request } from '../../../utils/requests/Request';
import { createProductPutRequestCommand } from './commands/ProductPutRequestCommand';

export class ProductPutRequest extends Request {
  constructor(product) {
    super();
    this.productPutRequestCommand = createProductPutRequestCommand(product);
  }

  onRequest = async () => {
    return await this.productPutRequestCommand.executeRequest();
  };

  addMultimediaBeforeRequest = files => {
    this.productPutRequestCommand.addMultimediaBeforeRequest(files);
  };
}

export const createProductPutRequest = product => {
  return new ProductPutRequest(product);
};
