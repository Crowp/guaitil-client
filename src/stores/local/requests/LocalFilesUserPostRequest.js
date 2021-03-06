import { RollbackRequest } from '../../../utils/requests/RollbackRequest';
import { LocalFilesPostRequest } from './LocalFilesPostRequest';
import { createUserPostCommand } from '../../user/requests/commands/UserPostRequestCommand';

export class LocalFilesUserPostRequest extends RollbackRequest {
  constructor(local, user) {
    super();
    this.localFilesPostRequest = new LocalFilesPostRequest(local);
    this.userPostRequestCommand = createUserPostCommand(user, local.member);
  }

  onRequest = async () => {
    const responseLocal = await this.localFilesPostRequest.onRequest();
    await this.userPostRequestCommand.executeRequest();
    return responseLocal;
  };

  onRollback = async () => {
    await this.userPostRequestCommand.onRollback();
    await this.localFilesPostRequest.onRollback();
  };
}

export const createLocalFilesUserPostRequest = (local, user) => {
  return new LocalFilesUserPostRequest(local, user);
};
