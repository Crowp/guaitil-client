import { RollbackRequestCommand } from './RollbackRequestCommand';

export class RollbackRequestCompositeCommand extends RollbackRequestCommand {
  _childrens = [];

  _addChild = requestCommand => {
    this._childrens.push(requestCommand);
  };

  executeRequest = async () => {
    try {
      this.response = await this.executeChildren();
      this.ifResponseIsNotValidThrowsError();
      return this.response;
    } catch (errorResponse) {
      this.response = errorResponse.response;
      await this.rollback();
      this.__throwErrorResponse();
    }
  };

  rollback = async () => {
    if (this.isExecuted) {
      for (const child of this._childrens) {
        await child.rollback();
      }
    }
  };

  executeChildren = async () => {
    let responseList = [];
    for (const child of this._childrens) {
      this.response = await child.executeRequest();
      responseList = [...responseList, this.response];
    }
    return responseList;
  };
}
