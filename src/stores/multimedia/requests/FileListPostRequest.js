import { RollbackRequest } from '../../../utils/requests/RollbackRequest';
import { createFileListPostCommand } from './commands/FileListPostRequestCommand';

export class FileListPostRequest extends RollbackRequest {
  constructor(multimedia, prefix, suffix) {
    super();
    this.fileListPostCommand = createFileListPostCommand(multimedia, prefix, suffix);
  }

  onRequest = async () => await this.fileListPostCommand.executeRequest();

  onRollback = async () => {
    await this.fileListPostCommand.rollback();
  };
}

export const createFileListPostRequest = (files, prefix, suffix) => {
  return new FileListPostRequest(files, prefix, suffix);
};
