import { RollbackRequest } from '../../../utils/requests/RollbackRequest';
import { createMemberLocalFilesPostRequest } from './MemberLocalFilesPostRequest';
import { createUserPostRequest } from '../../user/requests/UserPostRequest';

export class MemberLocalFilesUserPostRequest extends RollbackRequest {
  constructor(member, local, user) {
    super();
    this.memberLocalFilesPostRequest = createMemberLocalFilesPostRequest(member, local);
    this.userPostRequest = createUserPostRequest(user);
  }

  onRequest = async () => {
    const responseMember = await this.memberLocalFilesPostRequest.onRequest();
    this.userPostRequest.addMemberBeforeRequest(responseMember);
    await this.userPostRequest.onRequest();
    return responseMember;
  };

  onRollback = async () => {
    await this.userPostRequest.onRollback();
    await this.memberLocalFilesPostRequest.onRollback();
  };
}

export const createMemberLocalFilesUserPostRequest = (member, local, user) => {
  return new MemberLocalFilesUserPostRequest(member, local, user);
};
