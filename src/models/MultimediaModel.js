import { BaseModel } from 'sjs-base-model';

export default class MultimediaModel extends BaseModel {
  id = 0;
  fileName = '';
  format = '';
  size = 0;
  type = '';
  url = '';

  constructor(data = {}) {
    super();
    if (!Object.keys(data).length) {
      this.id = null;
    }
    this.update(data);
  }
}
