import { BaseModel } from 'sjs-base-model';
import MultimediaModel from './MultimediaModel';
import ProductDescription from './ProductDescription';
import LocalModel from './LocalModel';

export default class ProductModel extends BaseModel {
  id = 0;
  showProduct = true;
  productDescription = ProductDescription;
  local = LocalModel;
  multimedia = [MultimediaModel];

  constructor(data = {}) {
    super();
    this.update(data);
    if (!Object.keys(data).length) {
      this.id = null;
    }
  }
}
