import { Request } from '../../../utils/requests/Request';
import { createGalleryDeleteFilesByIdRequestCommand } from './commands/GalleryDeleteFileByIdRequestCommand';

export class GalleryDeleteFilesByIdRequest extends Request {
  constructor(query) {
    super();
    this.GalleryDeleteFilesByIdRequestCommand = createGalleryDeleteFilesByIdRequestCommand(query);
  }

  onRequest = async () => {
    return await this.GalleryDeleteFilesByIdRequestCommand.executeRequest();
  };
}

export const createGalleryDeleteFilesByIdRequest = query => {
  return new GalleryDeleteFilesByIdRequest(query);
};
