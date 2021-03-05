import { BaseModel } from 'sjs-base-model';
import MultimediaModel from './MultimediaModel';

export default class GalleryModel extends BaseModel {
  id = 0;
  createdAt = '';
  updatedAt = '';
  multimedia = [MultimediaModel];

  constructor(data = {}) {
    super();
    if (!Object.keys(data).length) {
      this.id = null;
    }
    this.update(data);
  }
}
