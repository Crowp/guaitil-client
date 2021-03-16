import { RollbackRequestCommand } from './RollbackRequestCommand';

export class RollbackRequestCompositeCommand extends RollbackRequestCommand {
  _childrens = [];

  _addChild = requestCommand => {
    this._childrens.push(requestCommand);
  };

  executeRequest = async () => {
    let responseList = [];
    try {
      for (const child of this._childrens) {
        const response = await child.executeRequest();
        responseList = [...responseList, response];
      }
      this.isExecuted = true;
      return responseList;
    } catch (error) {
      const errorResponse = error.response;
      await this.rollback();
      this.__throwErrorResponse(errorResponse);
    }
  };

  rollback = async () => {
    if (this.isExecuted) {
      for (const child of this._childrens) {
        await child.rollback();
      }
    }
  };
}
