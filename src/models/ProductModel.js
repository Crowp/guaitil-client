import { BaseModel } from 'sjs-base-model';
import MultimediaModel from './MultimediaModel';
import ProductPriceModel from './ProductPriceModel';
import LocalModel from './LocalModel';

export default class ProductModel extends BaseModel {
  id = 0;
  name = '';
  description = '';
  status = true;
  local = LocalModel;
  productType = '';
  multimedia = [MultimediaModel];
  productPrice = ProductPriceModel;

  constructor(data) {
    super();
    this.update(data);
  }
}
