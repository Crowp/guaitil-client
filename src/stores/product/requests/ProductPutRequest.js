import { Request } from '../../../utils/requests/Request';
import { createProductPutRequestCommand } from './commands/ProductPutRequestCommand';

export class ProductPutRequest extends Request {
  constructor(local) {
    super();
    this.productPutRequestCommand = createProductPutRequestCommand(local);
  }

  onRequest = async () => {
    return await this.productPutRequestCommand.executeRequest();
  };

  addMultimediaBeforeRequest = files => {
    this.productPutRequestCommand.addMultimediaBeforeRequest(files);
  };
}

export const createProductPutRequest = local => {
  return new ProductPutRequest(local);
};
