import { BaseModel } from 'sjs-base-model';
import ProductModel from './ProductModel';

export default class SaleModel extends BaseModel {
  id = 0;
  product = ProductModel;
  saleDate = '';
  amountSold = 1;

  constructor(data = {}) {
    super();
    if (!Object.keys(data).length) {
      this.id = null;
    }
    this.update(data);
  }
}
