import { RollbackRequest } from '../../../utils/requests/RollbackRequest';
import { createFileListPostCommand } from './commands/FileListPostRequestCommand';

export class FilesPostRequest extends RollbackRequest {
  constructor(multimedia) {
    super();
    this.fileListPostCommand = createFileListPostCommand(multimedia);
  }

  onRequest = async () => await this.fileListPostCommand.executeRequest();

  onRollback = async () => {
    await this.fileListPostCommand.rollback();
  };
}

export const createFilesPostRequest = files => {
  return new FilesPostRequest(files);
};
