import { BaseModel } from 'sjs-base-model';
import MultimediaModel from './MultimediaModel';

export default class LocalModel extends BaseModel {
  id = 0;
  name = 0;
  description = '';
  personId = 0;
  directionId = 0;
  telephone = '';
  idTypeLocal = 0;
  multimedia = MultimediaModel;

  constructor(data) {
    super();
    this.update(data);
  }
}
