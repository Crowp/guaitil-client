import { RollbackRequest } from '../../../utils/requests/RollbackRequest';
import { createMemberPostRequestCommand } from './commands/MemberPostRequestCommand';

export class MemberPostRequest extends RollbackRequest {
  constructor(member) {
    super();
    this.memberPostRequestCommand = createMemberPostRequestCommand(member);
  }

  onRequest = async () => await this.memberPostRequestCommand.executeRequest();

  onRollback = async () => {
    await this.memberPostRequestCommand.rollback();
  };
}

export const createMemberPostRequest = member => {
  return new MemberPostRequest(member);
};
