import { BaseModel } from 'sjs-base-model';
import AddressModel from './AddressModel';

export default class LocalDescription extends BaseModel {
  id = 0;
  localName = '';
  description = '';
  localTelephone = '';
  localType = '';
  address = AddressModel;
  createdAt = '';
  updatedAt = '';

  constructor(data = {}) {
    super();
    if (!Object.keys(data).length) {
      this.id = null;
    }
    this.update(data);
  }
}
