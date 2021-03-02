import { Request } from './Request';
import { createHandlerPostRequestCommand } from './commands/HandlerPostRequestCommand';

/**
 @abstract
 */
export class RollbackRequest extends Request {
  onRequest = async () => {
    throw new Error('Child implement');
  };

  getResponse = async () => {
    const requestHandler = createHandlerPostRequestCommand(this.onRequest, this.onRollback);

    return await requestHandler.executeRequest();
  };

  onRollback = async () => {
    throw new Error('Child implement');
  };
}
