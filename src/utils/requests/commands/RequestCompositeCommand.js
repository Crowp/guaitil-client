import { RequestCommand } from './RequestCommand';

export class RequestCompositeCommand extends RequestCommand {
  _childrens = [];

  _addChild = requestCommand => {
    this._childrens.push(requestCommand);
  };

  executeRequest = async () => {
    let responseList = [];
    try {
      for (const child of this._childrens) {
        this.response = await child.executeRequest();
        responseList = [...responseList, this.response];
      }
      this.isExecuted = true;
      return responseList;
    } catch (errorResponse) {
      this.response = errorResponse.response;
      await this.rollback();
      this.__throwErrorResponse();
    }
  };

  rollback = async () => {
    if (this.isExecuted) {
      for (const child of this._childrens) {
        console.log(child);
        await child.rollback();
      }
    }
  };
}
