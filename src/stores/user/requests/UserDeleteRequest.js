import { Request } from '../../../utils/requests/Request';
import { createUserDeleteRequestCommand } from './commands/UserDeleteRequestCommand';

export class UserDeleteRequest extends Request {
  constructor(query) {
    super();
    this.userDeleteRequestCommand = createUserDeleteRequestCommand(query);
  }

  onRequest = async () => {
    return await this.userDeleteRequestCommand.executeRequest();
  };
}

export const createUserDeleteRequest = query => {
  return new UserDeleteRequest(query);
};
