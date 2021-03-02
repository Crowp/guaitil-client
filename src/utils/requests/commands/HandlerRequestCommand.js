import { Command } from './Command';

export class HandlerRequestCommand extends Command {
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

export const createHandlerRequestCommand = (onRequest, onRollback) => {
  return new HandlerRequestCommand(onRequest, onRollback);
};
