import { Request } from '../../../utils/requests/Request';
import { createAuthLoginRequestCommand } from './commands/AuthLoginRequestCommand';

export class AuthLoginRequest extends Request {
  constructor(email, password) {
    super();
    this.AuthLoginRequestCommand = createAuthLoginRequestCommand(email, password);
  }

  onRequest = async () => {
    return await this.AuthLoginRequestCommand.executeRequest();
  };
}

export const createAuthLoginRequest = (email, password) => {
  return new AuthLoginRequest(email, password);
};
