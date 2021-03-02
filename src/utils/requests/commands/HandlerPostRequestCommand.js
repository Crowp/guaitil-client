import { Command } from './Command';

export class HandlerPostRequestCommand extends Command {
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
