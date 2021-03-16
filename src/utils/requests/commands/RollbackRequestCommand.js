import { RequestCommand } from './RequestCommand';

/**
 @abstract
 */
export class RollbackRequestCommand extends RequestCommand {
  isExecuted = false;

  rollback = () => {
    throw new Error('Child implement');
  };

  ifResponseIsNotValidThrowsError = response => {
    if (this.thereAreErrors(response)) {
      this.__throwErrorResponse(response);
    }
    this.isExecuted = true;
  };
}
