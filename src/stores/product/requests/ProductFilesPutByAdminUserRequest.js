import { RollbackRequest } from '../../../utils/requests/RollbackRequest';
import { createFileListPostRequest } from '../../multimedia/requests/FileListPostRequest';
import { createProductPutByAdminUserRequest } from './ProductPutByAdminUserRequest';

export class ProductFilesPutByAdminUserRequest extends RollbackRequest {
  constructor(product) {
    super();
    this.filesListPostRequest = createFileListPostRequest(product.newMultimedia, 'product_', '_image');
    this.productPutRequest = createProductPutByAdminUserRequest(product);
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

export const createProductFilesByAdminUserPutRequest = product => {
  return new ProductFilesPutByAdminUserRequest(product);
};
