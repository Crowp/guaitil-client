import { BaseModel } from 'sjs-base-model';

export default class TypeLocal extends BaseModel {
  id = 0;
  name = '';

  constructor(data) {
    super();
    this.update(data);
  }
}
