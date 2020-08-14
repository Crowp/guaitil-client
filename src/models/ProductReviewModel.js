import { BaseModel } from 'sjs-base-model';
import ProductModel from './ProductModel';

export default class ProductReviewModel extends BaseModel {
  id = 0;
  reviewDate = '';
  state = '';
  product = [ProductModel];

  constructor(data) {
    super();
    this.update(data);
  }
}
