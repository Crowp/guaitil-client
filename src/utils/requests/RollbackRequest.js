import { Request } from './Request';

/**
 @abstract
 */
export class RollbackRequest extends Request {
  getResponse = async () => {
    try {
      return await this.onRequest();
    } catch (error) {
      await this.onRollback();
      return error.response;
    }
  };

  onRollback = async () => {
    throw new Error('Child implement');
  };
}
