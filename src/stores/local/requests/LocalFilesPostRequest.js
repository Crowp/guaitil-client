import { RollbackRequest } from '../../../utils/requests/RollbackRequest';
import { createLocalPostRequestCommand } from './commands/LocalPostRequestCommand';
import { createFileListPostRequest } from '../../multimedia/requests/FileListPostRequest';

export class LocalFilesPostRequest extends RollbackRequest {
  constructor(local) {
    super();
    this.filesListPostRequest = createFileListPostRequest(local.multimedia, 'local_', '_image');
    this.localPostRequestCommand = createLocalPostRequestCommand(local);
  }

  onRequest = async () => {
    const responseFiles = await this.filesListPostRequest.onRequest();
    this.localPostRequestCommand.addMultimediaBeforeRequest(responseFiles);
    return await this.localPostRequestCommand.executeRequest();
  };

  addMemberBeforeRequest = member => {
    this.localPostRequestCommand.addMemberBeforeRequest(member);
  };

  onRollback = async () => {
    await this.localPostRequestCommand.rollback();
    await this.filesListPostRequest.onRollback();
  };
}

export const createLocalFilesPostRequest = local => {
  return new LocalFilesPostRequest(local);
};
