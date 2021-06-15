import { Request } from '../../../utils/requests/Request';
import { createProductDeleteRequest } from './ProductDeleteRequest';

export class ProductDeleteFilesbyIdRequest extends Request {
  constructor(productId, idFile) {
    super();
    const query = `delete-multimedia-by-id?id=${productId}&idMultimedia=${idFile}`;
    this.productDeleteRequest = createProductDeleteRequest(query);
  }
  onRequest = async () => {
    return await this.productDeleteRequest.onRequest();
  };
}

export const createProductDeleteFilesbyIdRequest = (productId, idFile) => {
  return new ProductDeleteFilesbyIdRequest(productId, idFile);
};
