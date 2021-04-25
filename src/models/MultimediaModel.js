import environment from 'environment';

import { BaseModel } from 'sjs-base-model';

export default class MultimediaModel extends BaseModel {
  id = 0;
  fileName = '';
  size = 0;
  format = '';
  type = '';
  url = '';

  constructor(data = {}) {
    super();
    if (!Object.keys(data).length) {
      this.id = null;
    }
    const updateData = {
      ...data,
      url: environment.base + data.url
    };
    console.log(updateData);
    this.update(updateData);
  }
}
