import { RequestCommand } from './RequestCommand';

/**
 @abstract
 */
export class RollbackRequestCommand extends RequestCommand {
  isExecuted = false;

  rollback = () => {
    throw new Error('Child implement');
  };

  ifResponseIsNotValidThrowsError = () => {
    super.ifResponseIsNotValidThrowsError();
    this.isExecuted = true;
  };
}
