import { RollbackRequest } from '../../../utils/requests/RollbackRequest';
import { createUserPasswordPutRequestCommand } from '../../user/requests/commands/UserPasswordPutRequestCommand';
import { createLocalFilesPutRequest } from './LocalFilesPutRequest';

export class LocalFilesUserPasswordPutstRequest extends RollbackRequest {
  constructor(local, user) {
    super();
    this.password = user?.password;
    this.localFilesPutRequest = createLocalFilesPutRequest(local);
    this.userPasswordPutRequestCommand = createUserPasswordPutRequestCommand(user.id, this.password);
  }

  onRequest = async () => {
    const responseLocal = await this.localFilesPutRequest.getResponse();
    if (this.password) {
      await this.userPasswordPutRequestCommand.executeRequest();
    }
    return responseLocal;
  };

  onRollback = async () => {
    await this.localFilesPutRequest.onRollback();
  };
}

export const createLocalFilesUserPasswordPutstRequest = (local, user) => {
  return new LocalFilesUserPasswordPutstRequest(local, user);
};
