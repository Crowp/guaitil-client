import { BaseModel } from 'sjs-base-model';

export default class MultimediaModel extends BaseModel {
  id = 0;
  name = '';
  url = '';

  constructor(data) {
    super();
    this.update(data);
  }
}
