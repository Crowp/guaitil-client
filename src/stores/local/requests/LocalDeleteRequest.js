import { Request } from '../../../utils/requests/Request';
import { createLocalDeleteRequestCommand } from './commands/LocalDeleteRequestCommand';

export class LocalDeleteRequest extends Request {
  constructor(query) {
    super();
    this.localDeleteRequestCommand = createLocalDeleteRequestCommand(query);
  }

  onRequest = async () => {
    return await this.localDeleteRequestCommand.executeRequest();
  };
}

export const createLocalDeleteRequest = query => {
  return new LocalDeleteRequest(query);
};
