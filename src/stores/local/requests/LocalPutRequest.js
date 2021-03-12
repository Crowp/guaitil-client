import { Request } from '../../../utils/requests/Request';
import { createLocalPutRequestCommand } from './commands/LocalPutRequestCommand';

export class LocalPutRequest extends Request {
  constructor(local) {
    super();
    this.localPutRequestCommand = createLocalPutRequestCommand(local);
  }
  addMultimediaBeforeRequest = files => {
    this.localPutRequestCommand.addMultimediaBeforeRequest(files);
  };

  onRequest = async () => {
    return await this.localPutRequestCommand.executeRequest();
  };
}

export const createLocalPutRequest = local => {
  return new LocalPutRequest(local);
};
