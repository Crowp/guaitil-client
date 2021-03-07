import { Request } from '../../../utils/requests/Request';
import { createSaleDeleteRequestCommand } from './commands/SaleDeleteRequestCommand';

export class SaleDeleteRequest extends Request {
  constructor(query) {
    super();
    this.saleDeleteRequestCommand = createSaleDeleteRequestCommand(query);
  }

  onRequest = async () => {
    return await this.saleDeleteRequestCommand.executeRequest();
  };
}

export const createSaleDeleteRequest = query => {
  return new SaleDeleteRequest(query);
};
