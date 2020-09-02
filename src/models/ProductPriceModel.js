import { BaseModel } from 'sjs-base-model';

export default class ProductPriceModel extends BaseModel {
  id = 0;
  cost = 0;
  sale = 0;

  constructor(data = {}) {
    super();
    if (!Object.keys(data).length) {
      this.id = null;
    }
    this.update(data);
  }
}
