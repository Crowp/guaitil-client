/**
 @abstract
 */
export class Request {
  onRequest = async () => {
    try {
      return await this.onRequest();
    } catch (error) {
      return error.response;
    }
  };

  getResponse = async () => {
    return await this.onRequest();
  };
}
