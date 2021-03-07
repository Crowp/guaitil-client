import { RollbackRequest } from '../../../utils/requests/RollbackRequest';
import { createProductPostRequestCommand } from './commands/ProductPostRequestCommand';

export class ProductPostRequest extends RollbackRequest {
  constructor(local) {
    super();
    this.productPostRequestCommand = createProductPostRequestCommand(local);
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

export const createProductPostRequest = local => {
  return new ProductPostRequest(local);
};
