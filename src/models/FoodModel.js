import { BaseModel } from 'sjs-base-model';
import ProductModel from './ProductModel';

export default class FoodModel extends BaseModel {
  product = ProductModel;
  id = 0;
  typeFood = '';
  kitchenId = '';

  constructor(data = {}) {
    super();
    if (!Object.keys(data).length) {
      this.id = null;
    }
    this.update(data);
  }
}
