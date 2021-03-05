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
    debugger;
    if (this.thereAreErrors(response)) {
      debugger;
      this.__throwErrorResponse(response);
    }
    this.isExecuted = true;
  };
}
