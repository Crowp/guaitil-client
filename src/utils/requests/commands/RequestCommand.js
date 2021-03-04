import HttpErrorResponseModel from '../../../models/HttpErrorResponseModel';

/**
 @abstract
 */
export class RequestCommand {
  executeRequest = () => {
    throw new Error('Child implement');
  };

  thereAreErrors = () => this.response instanceof HttpErrorResponseModel;

  ifResponseIsNotValidThrowsError = () => {
    if (this.thereAreErrors()) {
      this.__throwErrorResponse();
    }
  };

  __throwErrorResponse = () => {
    const errorResponse = new Error('Something happend');
    errorResponse.response = this.response;
    throw errorResponse;
  };
}
