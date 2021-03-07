import { Request } from '../../../utils/requests/Request';
import { createSalesRequestCommand } from './commands/SalesRequestCommand';

export class SalesRequest extends Request {
  constructor(query = '') {
    super();
    this.salesRequestCommand = createSalesRequestCommand(query);
  }

  onRequest = async () => {
    return await this.salesRequestCommand.executeRequest();
  };
}

export const createSalesRequest = (query = '') => {
  return new SalesRequest(query);
};
