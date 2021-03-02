/**
 @abstract
 */
export class Request {
  onRequest = async () => {
    throw new Error('Child implement');
  };

  getResponse = async () => {
    return await this.onRequest();
  };
}
