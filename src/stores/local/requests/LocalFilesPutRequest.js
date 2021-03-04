import { RollbackRequest } from '../../../utils/requests/RollbackRequest';
import { createFileListPostRequest } from '../../multimedia/requests/FileListPostRequest';
import { createLocalPutRequestCommand } from './commands/LocalPutRequestCommand';

export class LocalFilesPutRequest extends RollbackRequest {
  constructor(local) {
    super();
    this.filesListPostRequest = createFileListPostRequest(local.multimedia);
    this.localPutRequestCommand = createLocalPutRequestCommand(local);
  }

  onRequest = async () => {
    const responseFiles = await this.filesListPostRequest.getResponse();
    this.localPutRequestCommand.addMultimediaBeforeRequest(responseFiles);
    return await this.localPutRequestCommand.executeRequest();
  };

  onRollback = async () => {
    await this.filesListPostRequest.onRollback();
  };
}

export const createLocalFilesPutRequest = local => {
  return new LocalFilesPutRequest(local);
};
