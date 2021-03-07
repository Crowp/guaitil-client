import { Request } from '../../../utils/requests/Request';
import { createUsersRequestCommand } from './commands/UsersRequestCommand';

export class UsersRequest extends Request {
  constructor(query = '') {
    super();
    this.usersRequestCommand = createUsersRequestCommand(query);
  }

  onRequest = async () => {
    return await this.usersRequestCommand.executeRequest();
  };
}

export const createUsersRequest = (query = '') => {
  return new UsersRequest(query);
};
