import { RollbackRequest } from '../../../utils/requests/RollbackRequest';
import { createFileListPostRequest } from '../../multimedia/requests/FileListPostRequest';
import { createProductPutRequest } from './ProductPutRequest';

export class ProductFilesPutRequest extends RollbackRequest {
  constructor(product) {
    super();
    this.filesListPostRequest = createFileListPostRequest(product.newMultimedia, 'product_', '_image');
    this.productPutRequest = createProductPutRequest(product);
  }

  onRequest = async () => {
    const responseFiles = await this.filesListPostRequest.onRequest();
    this.productPutRequest.addMultimediaBeforeRequest(responseFiles);
    return await this.productPutRequest.onRequest();
  };

  onRollback = async () => {
    await this.filesListPostRequest.onRollback();
  };
}

export const createProductFilesPutRequest = product => {
  return new ProductFilesPutRequest(product);
};
