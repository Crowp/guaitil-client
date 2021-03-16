import { BaseModel } from 'sjs-base-model';
import ProductDescription from './ProductDescription';

export default class ProductReviewModel extends BaseModel {
  id = 0;
  reviewDate = '';
  state = '';
  comment = '';
  createdAt = '';
  updatedAt = '';
  productDescription = ProductDescription;

  constructor(data = {}) {
    super();
    if (!Object.keys(data).length) {
      this.id = null;
    }
    this.update(data);
  }
}
