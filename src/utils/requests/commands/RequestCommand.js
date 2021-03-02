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
    this.isExecuted = true;
  };
}
