import { RequestCommand } from './RequestCommand';

/**
 @abstract
 */
export class RollbackRequestCommand extends RequestCommand {
  isExecuted = false;

  rollback = () => {
    throw new Error('Child implement');
  };

  __throwErrorResponse = () => {
    const errorResponse = new Error('Something happend');
    errorResponse.response = this.response;
    throw errorResponse;
  };

  ifResponseIsNotValidThrowsError = () => {
    super.ifResponseIsNotValidThrowsError();
    this.isExecuted = true;
  };
}
