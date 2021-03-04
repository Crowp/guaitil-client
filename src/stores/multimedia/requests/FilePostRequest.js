import { RollbackRequest } from '../../../utils/requests/RollbackRequest';
import { createFilePostRequestCommand } from './commands/FilePostRequestCommand';

export class FilePostRequest extends RollbackRequest {
  constructor(file, prefix, suffix) {
    super();
    this.filePostCommand = createFilePostRequestCommand(file, prefix, suffix);
  }

  onRequest = async () => await this.filePostCommand.executeRequest();

  onRollback = async () => {
    await this.filePostCommand.rollback();
  };
}

export const createFilePostRequest = (file, prefix, suffix) => {
  return new FilePostRequest(file, prefix, suffix);
};
