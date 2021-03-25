import { BaseModel } from 'sjs-base-model';
import MultimediaModel from './MultimediaModel';
import MemberModel from './MemberModel';
import ProductModel from './ProductModel';
import LocalDescription from './LocalDescription';

export default class LocalModel extends BaseModel {
  id = 0;
  localDescription = LocalDescription;
  member = MemberModel;
  products = [ProductModel];
  multimedia = [MultimediaModel];
  showLocal = true;

  constructor(data = {}) {
    super();
    if (!Object.keys(data).length) {
      this.id = null;
    }
    this.update(data);
  }
}
