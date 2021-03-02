import { Request } from './Request';
import { createLocalPostCommand } from './commands/LocalPostRequestCommand';
import { createFilesPostRequest } from './FilesPostRequest';

export class LocalFilesPostRequest extends Request {
  localPostRequest = { rollbackAll: async () => {} };

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
    await this.localPostRequest.rollbackAll();
    await this.filePostRequest.onRollback();
  };
}

export const createLocalFilesPostRequest = local => {
  return new LocalFilesPostRequest(local);
};
