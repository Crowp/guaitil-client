import { createHandlerRequestCommand } from './commands/HandlerRequestCommand';

/**
 @abstract
 */
export class Request {
  onRequest = async () => {
    throw new Error('Child implement');
  };

  getResponse = async () => {
    const requestHandler = createHandlerRequestCommand(this.onRequest, this.onRollback);

    return await requestHandler.executeRequest();
  };

  onRollback = async () => {
    throw new Error('Child implement');
  };
}
