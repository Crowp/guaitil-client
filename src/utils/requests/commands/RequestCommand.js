import HttpErrorResponseModel from '../../../models/HttpErrorResponseModel';

/**
 @abstract
 */
export class RequestCommand {
  executeRequest = () => {
    throw new Error('Child implement');
  };

  thereAreErrors = response => response instanceof HttpErrorResponseModel;

  ifResponseIsNotValidThrowsError = response => {
    if (this.thereAreErrors(response)) {
      this.__throwErrorResponse(response);
    }
  };

  __throwErrorResponse = response => {
    const errorResponse = new Error('Something happend');
    errorResponse.response = response;
    throw errorResponse;
  };
}
