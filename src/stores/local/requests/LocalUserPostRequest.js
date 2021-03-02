import { RequestPost } from '../../../utils/requests/RequestPost';
import { LocalFilesPostRequest } from './LocalFilesPostRequest';
import { createUserPostRequest } from '../../user/requests/UserPostRequest';

export class LocalUserPostRequest extends RequestPost {
  constructor(local, user) {
    super();
    this.localFilesPostRequest = new LocalFilesPostRequest(local);
    this.userPostRequest = createUserPostRequest(user, local.member);
  }

  onRequest = async () => {
    const responseLocal = await this.localFilesPostRequest.getResponse();
    await this.userPostRequest.executeRequest();
    return responseLocal;
  };

  onRollback = async () => {
    await this.userPostRequest.onRollback();
    await this.localFilesPostRequest.onRollback();
  };
}

export const createLocalUserPostRequest = (local, user) => {
  return new LocalUserPostRequest(local, user);
};
