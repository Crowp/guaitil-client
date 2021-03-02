import { RequestCommand } from './RequestCommand';

export class HandlerPostRequestCommand extends RequestCommand {
  constructor(onRequest, onRollback) {
    super();
    this.onRequest = onRequest;
    this.onRollback = onRollback;
  }
  executeRequest = async () => {
    try {
      return await this.onRequest();
    } catch (error) {
      await this.onRollback();
      return error.response;
    }
  };
}

export const createHandlerPostRequestCommand = (onRequest, onRollback) => {
  return new HandlerPostRequestCommand(onRequest, onRollback);
};
