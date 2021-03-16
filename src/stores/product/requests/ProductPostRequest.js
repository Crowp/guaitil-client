import { RollbackRequest } from '../../../utils/requests/RollbackRequest';
import { createProductPostRequestCommand } from './commands/ProductPostRequestCommand';

export class ProductPostRequest extends RollbackRequest {
  constructor(product) {
    super();
    this.productPostRequestCommand = createProductPostRequestCommand(product);
  }

  onRequest = async () => {
    return await this.productPostRequestCommand.executeRequest();
  };

  onRollback = async () => {
    await this.productPostRequestCommand.rollback();
  };

  addMultimediaBeforeRequest = files => {
    this.productPostRequestCommand.addMultimediaBeforeRequest(files);
  };
}

export const createProductPostRequest = product => {
  return new ProductPostRequest(product);
};
