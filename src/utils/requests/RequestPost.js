import { createHandlerPostRequestCommand } from './commands/HandlerPostRequestCommand';

/**
 @abstract
 */
export class RequestPost {
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
