import { Request } from './Request';
import { LocalFilesPostRequest } from './LocalFilesPostRequest';
import { createUserPostCommand } from './commands/UserPostRequestCommand';

export class LocalUserPostRequest extends Request {
  constructor(local, user) {
    super();
    this.localFilesPostRequest = new LocalFilesPostRequest(local);
    this.userPostRequestCommand = createUserPostCommand(user, local.member);
  }

  onRequest = async () => {
    const responseLocal = await this.localFilesPostRequest.getResponse();
    await this.userPostRequestCommand.executeRequest();
    return responseLocal;
  };

  onRollback = async () => {
    await this.userPostRequestCommand.rollback();
    await this.localFilesPostRequest.onRollback();
  };
}

export const createLocalUserPostRequest = (local, user) => {
  return new LocalUserPostRequest(local, user);
};
