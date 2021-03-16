import { Request } from '../../../utils/requests/Request';
import { createMemberPutRequestCommand } from './commands/MemberPutRequestCommand';

export class MemberPutRequest extends Request {
  constructor(query = '') {
    super();
    this.memberPutRequestCommand = createMemberPutRequestCommand(query);
  }

  onRequest = async () => {
    return await this.memberPutRequestCommand.executeRequest();
  };
}

export const createMemberPutRequest = (query = '') => {
  return new MemberPutRequest(query);
};
