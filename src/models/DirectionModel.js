import { BaseModel } from 'sjs-base-model';

export default class DirectionModel extends BaseModel {
  id = 0;
  physicalAddress = '';
  virtualAddress = '';

  constructor(data) {
    super();
    this.update(data);
  }
}
