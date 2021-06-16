import { Request } from '../../../utils/requests/Request';
import { createProductPutByAdminUserRequestCommand } from './commands/ProductPutByAdminUserRequestCommand';

export class ProductPutByAdminUserRequest extends Request {
  constructor(product) {
    super();
    this.productPutRequestByAdminUserCommand = createProductPutByAdminUserRequestCommand(product);
  }

  onRequest = async () => {
    return await this.productPutRequestByAdminUserCommand.executeRequest();
  };

  addMultimediaBeforeRequest = files => {
    this.productPutRequestByAdminUserCommand.addMultimediaBeforeRequest(files);
  };
}

export const createProductPutByAdminUserRequest = product => {
  return new ProductPutByAdminUserRequest(product);
};
