import { RequestPost } from '../../../utils/requests/RequestPost';
import { createLocalPostCommand } from './commands/LocalPostRequestCommand';
import { createFilesPostRequest } from '../../multimedia/requests/FilesPostRequest';

export class LocalFilesPostRequest extends RequestPost {
  constructor(local) {
    super();
    this.filePostRequest = createFilesPostRequest(local.multimedia);
    this.localPostRequestCommand = createLocalPostCommand(local);
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
