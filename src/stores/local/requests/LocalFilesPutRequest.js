import { RollbackRequest } from '../../../utils/requests/RollbackRequest';
import { createFileListPostRequest } from '../../multimedia/requests/FileListPostRequest';
import { createLocalPutRequest } from './LocalPutRequest';

export class LocalFilesPutRequest extends RollbackRequest {
  constructor(local) {
    super();
    this.localPutRequest = createLocalPutRequest(local);
    this.filesListPostRequest = createFileListPostRequest(local.newMultimedia, 'local_', '_image');
  }

  onRequest = async () => {
    const responseFiles = await this.filesListPostRequest.onRequest();
    this.localPutRequest.addMultimediaBeforeRequest(responseFiles);
    return await this.localPutRequest.onRequest();
  };

  onRollback = async () => {
    await this.filesListPostRequest.onRollback();
  };
}

export const createLocalFilesPutRequest = local => {
  return new LocalFilesPutRequest(local);
};
