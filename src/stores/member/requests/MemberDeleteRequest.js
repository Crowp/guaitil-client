import { Request } from '../../../utils/requests/Request';
import { createMemberDeleteRequestCommand } from './commands/MemberDeleteRequestCommand';

export class MemberDeleteRequest extends Request {
  constructor(query) {
    super();
    this.memberDeleteRequestCommand = createMemberDeleteRequestCommand(query);
  }

  onRequest = async () => {
    return await this.memberDeleteRequestCommand.executeRequest();
  };
}

export const createMemberDeleteRequest = query => {
  return new MemberDeleteRequest(query);
};
