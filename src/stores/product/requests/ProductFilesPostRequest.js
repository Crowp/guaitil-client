import { RollbackRequest } from '../../../utils/requests/RollbackRequest';
import { createProductPostRequest } from './ProductPostRequest';
import { createFileListPostRequest } from '../../multimedia/requests/FileListPostRequest';

export class ProductFilesPostRequest extends RollbackRequest {
  constructor(product) {
    super();
    this.filesListPostRequest = createFileListPostRequest(product.multimedia, 'product_', '_image');
    this.productPostRequest = createProductPostRequest(product);
  }

  onRequest = async () => {
    const responseFiles = await this.filesListPostRequest.onRequest();
    this.productPostRequest.addMultimediaBeforeRequest(responseFiles);
    return await this.productPostRequest.onRequest();
  };

  onRollback = async () => {
    await this.productPostRequest.onRollback();
    await this.filesListPostRequest.onRollback();
  };
}

export const createProductFilesPostRequest = product => {
  return new ProductFilesPostRequest(product);
};
