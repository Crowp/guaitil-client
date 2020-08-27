import { BaseModel } from 'sjs-base-model';

export default class AddressModel extends BaseModel {
  id = 0;
  latitude = 0;
  longitude = 0;

  constructor(data = {}) {
    super();
    if (!Object.keys(data).length) {
      this.id = null;
    }
    this.update(data);
  }
}
