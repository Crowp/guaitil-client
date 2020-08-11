import { BaseModel } from 'sjs-base-model';
import MultimediaModel from './MultimediaModel';

export default class ProductModel extends BaseModel {
  id = 0;
  name = '';
  description = '';
  costPrice = 0;
  costSale = 0;
  multimedia = MultimediaModel;

  constructor(data) {
    super();
    this.update(data);
  }
}
