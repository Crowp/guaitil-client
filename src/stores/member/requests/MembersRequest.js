import { Request } from '../../../utils/requests/Request';
import { createMembersRequestCommand } from './commands/MembersRequestCommand';

export class MembersRequest extends Request {
  constructor(query = '') {
    super();
    this.membersRequestCommand = createMembersRequestCommand(query);
  }

  onRequest = async () => {
    return await this.membersRequestCommand.executeRequest();
  };
}

export const createMembersRequest = (query = '') => {
  return new MembersRequest(query);
};
