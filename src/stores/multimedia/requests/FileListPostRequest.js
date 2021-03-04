import { RollbackRequest } from '../../../utils/requests/RollbackRequest';
import { createFileListPostCommand } from './commands/FileListPostRequestCommand';

export class FileListPostRequest extends RollbackRequest {
  constructor(multimedia) {
    super();
    this.fileListPostCommand = createFileListPostCommand(multimedia);
  }

  onRequest = async () => await this.fileListPostCommand.executeRequest();

  onRollback = async () => {
    await this.fileListPostCommand.rollback();
  };
}

export const createFileListPostRequest = files => {
  return new FileListPostRequest(files);
};
