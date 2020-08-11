import { BaseModel } from 'sjs-base-model';
import ProductModel from './ProductModel';

export default class CraftModel extends BaseModel {
  id = 0;
  workshopId = 0;
  product = ProductModel;

  constructor(data) {
    super();
    this.update(data);
  }
}
