import { RequestPost } from './RequestPost';
import { createFileListPostCommand } from './commands/FileListPostRequestCommand';

export class FilesPostRequest extends RequestPost {
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
