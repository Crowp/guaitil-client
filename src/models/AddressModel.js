import { BaseModel } from 'sjs-base-model';
import VirtualAddressModel from './VirtualAddressModel';

export default class AddressModel extends BaseModel {
  id = 0;
  physicalAddress = '';
  virtualAddress = VirtualAddressModel;

  constructor(data = {}) {
    super();
    if (!Object.keys(data).length) {
      this.id = null;
    }
    this.update(data);
  }
}
