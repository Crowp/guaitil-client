/**
 @abstract
 */
export class Request {
  onRequest = async () => {
    throw new Error('Child implement');
  };
  getResponse = async () => {
    try {
      return await this.onRequest();
    } catch (error) {
      return error.response;
    }
  };
}
