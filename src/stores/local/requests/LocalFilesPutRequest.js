import { RollbackRequest } from '../../../utils/requests/RollbackRequest';
import { createFilesPostRequest } from '../../multimedia/requests/FilesPostRequest';
import { createLocalPutRequestCommand } from './commands/LocalPutRequestCommand';

export class LocalFilesPutRequest extends RollbackRequest {
  constructor(local) {
    super();
    this.filePostRequest = createFilesPostRequest(local.multimedia);
    this.localPutRequestCommand = createLocalPutRequestCommand(local);
  }

  onRequest = async () => {
    const responseFiles = await this.filePostRequest.getResponse();
    this.localPutRequestCommand.addMultimediaBeforeRequest(responseFiles);
    return await this.localPutRequestCommand.executeRequest();
  };

  onRollback = async () => {
    await this.filePostRequest.onRollback();
  };
}

export const createLocalFilesPutRequest = local => {
  return new LocalFilesPutRequest(local);
};
