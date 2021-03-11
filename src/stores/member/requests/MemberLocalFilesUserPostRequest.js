import { RollbackRequest } from '../../../utils/requests/RollbackRequest';
import { createUserPostRequest } from '../../user/requests/UserPostRequest';
import { createLocalFilesPostRequest } from '../../local/requests/LocalFilesPostRequest';
import { createMemberPostRequest } from './MemberPostRequest';

export class MemberLocalFilesUserPostRequest extends RollbackRequest {
  constructor(member, local, user) {
    super();
    this.memberLocalFilesPostRequest = createMemberPostRequest(member);
    this.localFilesPostRequest = createLocalFilesPostRequest(local);
    this.userPostRequest = createUserPostRequest(user);
  }

  onRequest = async () => {
    const responseMember = await this.memberLocalFilesPostRequest.onRequest();
    this.__loadMemberToNextRequests(responseMember);
    await this.localFilesPostRequest.onRequest();
    await this.userPostRequest.onRequest();
    return responseMember;
  };

  __loadMemberToNextRequests(responseMember) {
    this.localFilesPostRequest.addMemberBeforeRequest(responseMember);
    this.userPostRequest.addMemberBeforeRequest(responseMember);
  }

  onRollback = async () => {
    await this.userPostRequest.onRollback();
    await this.memberLocalFilesPostRequest.onRollback();
  };
}

export const createMemberLocalFilesUserPostRequest = (member, local, user) => {
  return new MemberLocalFilesUserPostRequest(member, local, user);
};
