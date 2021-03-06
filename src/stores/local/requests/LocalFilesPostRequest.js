import { RollbackRequest } from '../../../utils/requests/RollbackRequest';
import { createLocalPostRequestCommand } from './commands/LocalPostRequestCommand';
import { createFileListPostCommand } from '../../multimedia/requests/commands/FileListPostRequestCommand';

export class LocalFilesPostRequest extends RollbackRequest {
  constructor(local) {
    super();
    this.filesListPostRequestCommand = createFileListPostCommand(local.multimedia, 'local_', '_image');
    this.localPostRequestCommand = createLocalPostRequestCommand(local);
  }

  onRequest = async () => {
    const responseFiles = await this.filesListPostRequestCommand.executeRequest();
    this.localPostRequestCommand.addMultimediaBeforeRequest(responseFiles);
    const response = await this.localPostRequestCommand.executeRequest();
    return response;
  };

  onRollback = async () => {
    await this.localPostRequestCommand.rollback();
    await this.filesListPostRequestCommand.onRollback();
  };
}

export const createLocalFilesPostRequest = local => {
  return new LocalFilesPostRequest(local);
};
