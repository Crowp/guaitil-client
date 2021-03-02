import { Request } from './Request';
import { createFileListPostCommand } from './commands/FileListPostRequestCommand';

export class FilesPostRequest extends Request {
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
