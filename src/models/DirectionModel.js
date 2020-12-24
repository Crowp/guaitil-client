import { BaseModel } from 'sjs-base-model';

export default class DirectionModel extends BaseModel {
  id = 0;
  physicalAddress = '';
  virtualAddress = '';

  constructor(data = {}) {
    super();
    if (!Object.keys(data).length) {
      this.id = null;
    }
    this.update(data);
  }
}
