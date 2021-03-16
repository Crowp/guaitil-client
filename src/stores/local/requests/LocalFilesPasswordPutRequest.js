import { RollbackRequest } from '../../../utils/requests/RollbackRequest';
import { createUserPasswordPutRequest } from '../../user/requests/UserPasswordPutRequest';
import { createLocalFilesPutRequest } from './LocalFilesPutRequest';

export class LocalFilesUserPasswordPutRequest extends RollbackRequest {
  constructor(local, user) {
    super();
    this.password = user?.password;
    this.localFilesPutRequest = createLocalFilesPutRequest(local);
    this.userPasswordPutRequest = createUserPasswordPutRequest(user.id, this.password);
  }

  onRequest = async () => {
    const responseLocal = await this.localFilesPutRequest.onRequest();
    if (this.password) {
      await this.userPasswordPutRequest.onRequest();
    }
    return responseLocal;
  };

  onRollback = async () => {
    await this.localFilesPutRequest.onRollback();
  };
}

export const createLocalFilesUserPasswordPutRequest = (local, user) => {
  return new LocalFilesUserPasswordPutRequest(local, user);
};
