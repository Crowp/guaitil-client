import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';

/**
 @abstract
 */
export class RequestCommand {
  isExecuted = false;

  executeRequest = () => {
    throw new Error('Child implement');
  };

  rollback = () => {
    throw new Error('Child implement');
  };

  thereAreErrors = () => this.response instanceof HttpErrorResponseModel;

  ifResponseIsNotValidThrowsError = () => {
    if (this.thereAreErrors()) {
      this.__throwErrorResponse();
    }
    this.isExecuted = true;
  };

  __throwErrorResponse = () => {
    const errorResponse = new Error('Something happend');
    errorResponse.response = this.response;
    throw errorResponse;
  };

  getErrorResponse = () => this._errorResponse;
}
