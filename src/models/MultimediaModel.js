import { BaseModel } from 'sjs-base-model';

export default class MultimediaModel extends BaseModel {
  id = 0;
  fileName = '';
  formats = '';
  type = '';
  url = '';

  constructor(data) {
    super();
    this.update(data);
  }
}
