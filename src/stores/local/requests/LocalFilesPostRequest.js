import { RollbackRequest } from '../../../utils/requests/RollbackRequest';
import { createLocalPostRequestCommand } from './commands/LocalPostRequestCommand';
import { createFilesPostRequest } from '../../multimedia/requests/FilesPostRequest';

export class LocalFilesPostRequest extends RollbackRequest {
  constructor(local) {
    super();
    this.filePostRequest = createFilesPostRequest(local.newMultimedia);
    this.localPostRequestCommand = createLocalPostRequestCommand(local);
  }

  onRequest = async () => {
    const responseFiles = await this.filePostRequest.getResponse();
    this.localPostRequestCommand.addMultimediaBeforeRequest(responseFiles);
    return await this.localPostRequestCommand.executeRequest();
  };

  onRollback = async () => {
    await this.localPostRequestCommand.rollback();
    await this.filePostRequest.onRollback();
  };
}

export const createLocalFilesPostRequest = local => {
  return new LocalFilesPostRequest(local);
};
