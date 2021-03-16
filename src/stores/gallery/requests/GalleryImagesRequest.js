import { Request } from '../../../utils/requests/Request';
import { createGalleryImagesRequestCommand } from './commands/GalleryImagesRequestCommand';

export class GalleryImagesRequest extends Request {
  constructor() {
    super();
    this.GalleryImagesRequestCommand = createGalleryImagesRequestCommand();
  }

  onRequest = async () => {
    return await this.GalleryImagesRequestCommand.executeRequest();
  };
}

export const createGalleryImagesRequest = () => {
  return new GalleryImagesRequest();
};
