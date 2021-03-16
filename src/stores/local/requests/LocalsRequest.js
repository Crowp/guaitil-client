import { Request } from '../../../utils/requests/Request';
import { createLocalsRequestCommand } from './commands/LocalsRequestCommand';

export class LocalsRequest extends Request {
  constructor(query = '') {
    super();
    this.localsRequestCommand = createLocalsRequestCommand(query);
  }

  onRequest = async () => {
    return await this.localsRequestCommand.executeRequest();
  };
}

export const createLocalsRequest = (query = '') => {
  return new LocalsRequest(query);
};
