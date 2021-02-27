import { BaseModel } from 'sjs-base-model';
import MultimediaModel from './MultimediaModel';
import AddressModel from './AddressModel';
import MemberModel from './MemberModel';
import ProductModel from './ProductModel';

export default class LocalModel extends BaseModel {
  id = 0;
  name = '';
  description = '';
  telephone = '';
  localType = '';
  address = AddressModel;
  member = MemberModel;
  multimedia = [MultimediaModel];
  products = [ProductModel];
  state = true;

  constructor(data = {}) {
    super();
    if (!Object.keys(data).length) {
      this.id = null;
    }
    this.update(data);
  }
}
