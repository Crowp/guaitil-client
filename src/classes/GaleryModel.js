import { BaseModel } from 'sjs-base-model';
import MultimediaModel from './MultimediaModel';

export default class GaleryModel extends BaseModel {
  id = 0;
  name = '';
  description = '';
  multimedia = MultimediaModel;

  constructor(data) {
    super();
    this.update(data);
  }
}
