import { Request } from '../../../utils/requests/Request';
import { createUserRolesPutRequestCommand } from './commands/UserRolesPutRequestCommand';

export class UserRolesPutRequest extends Request {
  constructor(userId, roles) {
    super();
    this.userRolesPutRequestCommand = createUserRolesPutRequestCommand(userId, roles);
  }

  onRequest = async () => {
    return await this.userRolesPutRequestCommand.executeRequest();
  };
}

export const createUserRolesPutRequest = (userId, roles) => {
  return new UserRolesPutRequest(userId, roles);
};
