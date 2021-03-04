import { Request } from '../../../utils/requests/Request';
import { createUserPasswordPutRequestCommand } from './commands/UserPasswordPutRequestCommand';

export class UserPasswordPutRequest extends Request {
  constructor(userId, password) {
    super();
    this.userPasswordPutRequestCommand = createUserPasswordPutRequestCommand(userId, password);
  }

  onRequest = async () => await this.userPasswordPutRequestCommand.executeRequest();
}

export const createUserPasswordPutRequest = (userId, password) => {
  return new UserPasswordPutRequest(userId, password);
};
