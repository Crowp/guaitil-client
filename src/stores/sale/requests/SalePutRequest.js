import { Request } from '../../../utils/requests/Request';
import { createSalePutRequestCommand } from './commands/SalePutRequestCommand';

export class SalePutRequest extends Request {
  constructor(sale) {
    super();
    this.salePutRequestCommand = createSalePutRequestCommand(sale);
  }

  onRequest = async () => {
    return await this.salePutRequestCommand.executeRequest();
  };
}

export const createSalePutRequest = sale => {
  return new SalePutRequest(sale);
};
