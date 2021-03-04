import { Request } from '../../../utils/requests/Request';
import { createFileDeleteByIdRequestCommand } from './commands/FileDeleteByIdRequestCommand';

export class FileDeleteByIdRequest extends Request {
  constructor(query) {
    super();
    this.fileDeleteByIdRequestCommand = createFileDeleteByIdRequestCommand(query);
  }

  onRequest = async () => {
    return await this.fileDeleteByIdRequestCommand.executeRequest();
  };
}

export const createFileDeleteByIdRequest = query => {
  return new FileDeleteByIdRequest(query);
};
