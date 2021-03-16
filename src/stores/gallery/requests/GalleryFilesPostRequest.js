import { RollbackRequest } from '../../../utils/requests/RollbackRequest';
import { createFileListPostRequest } from '../../multimedia/requests/FileListPostRequest';
import { createGalleryPostRequestCommand } from './commands/GalleryPostRequestCommand';

export class GalleryFilesPostRequest extends RollbackRequest {
  constructor(files) {
    super();
    this.filesListPostRequest = createFileListPostRequest(files, 'gallery_', '_image');
    this.galleryPostRequestCommand = createGalleryPostRequestCommand();
  }

  onRequest = async () => {
    const responseFiles = await this.filesListPostRequest.onRequest();
    this.galleryPostRequestCommand.addMultimediaBeforeRequest(responseFiles);
    return await this.galleryPostRequestCommand.executeRequest();
  };

  onRollback = async () => {
    await this.filesListPostRequest.onRollback();
  };
}

export const createGalleryFilesPostRequest = files => {
  return new GalleryFilesPostRequest(files);
};
