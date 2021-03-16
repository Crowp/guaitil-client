import { RollbackRequest } from '../../../utils/requests/RollbackRequest';
import { createLocalFilesPostRequest } from './LocalFilesPostRequest';
import { createUserPostRequest } from '../../user/requests/UserPostRequest';

export class LocalFilesUserPostRequest extends RollbackRequest {
  constructor(local, user) {
    super();
    this.localFilesPostRequest = createLocalFilesPostRequest(local);
    this.userPostRequest = createUserPostRequest(user, local.member);
  }

  onRequest = async () => {
    const responseLocal = await this.localFilesPostRequest.onRequest();
    await this.userPostRequest.onRequest();
    return responseLocal;
  };

  onRollback = async () => {
    await this.userPostRequest.onRollback();
    await this.localFilesPostRequest.onRollback();
  };
}

export const createLocalFilesUserPostRequest = (local, user) => {
  return new LocalFilesUserPostRequest(local, user);
};
