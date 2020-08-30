import { BaseModel } from 'sjs-base-model';
import MultimediaModel from './MultimediaModel';

export default class GalleryModel extends BaseModel {
  id = 0;
  multimedia = [MultimediaModel];

  constructor(data) {
    super();
    this.update(data);
  }
}
