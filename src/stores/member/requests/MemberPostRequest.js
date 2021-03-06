import { RollbackRequest } from '../../../utils/requests/RollbackRequest';
import { createMemberPostRequestCommand } from './commands/MemberPostRequestCommand';

export class MemberPostRequest extends RollbackRequest {
  constructor(member, local = null) {
    super();
    this.memberPostRequestCommand = createMemberPostRequestCommand(member);
    if (!!local) {
      this.memberPostRequestCommand.addLocalBeforeRequest(local);
    }
  }

  onRequest = async () => await this.memberPostRequestCommand.executeRequest();

  addMultimediaBeforeRequest = files => {
    this.memberPostRequestCommand.addMultimediaBeforeRequest(files);
  };

  onRollback = async () => {
    await this.memberPostRequestCommand.rollback();
  };
}

export const createMemberPostRequest = (member, local = null) => {
  return new MemberPostRequest(member, local);
};
