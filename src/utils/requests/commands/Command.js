/**
 @abstract
 */
export class Command {
  executeRequest = () => {
    throw new Error('Child implement');
  };
}
