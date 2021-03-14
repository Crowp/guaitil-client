import { BaseModel } from 'sjs-base-model';
import ProductDescription from './ProductDescription';

export default class SaleModel extends BaseModel {
  id = 0;
  productDescription = ProductDescription;
  saleDate = '';
  amountSold = 1;
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
