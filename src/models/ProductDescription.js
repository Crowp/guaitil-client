import { BaseModel } from 'sjs-base-model';
import ProductPriceModel from './ProductPriceModel';

export default class ProductDescription extends BaseModel {
  id = 0;
  name = '';
  description = '';
  productType = '';
  productPrice = ProductPriceModel;
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
