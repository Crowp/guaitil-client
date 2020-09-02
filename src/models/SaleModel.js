import { BaseModel } from 'sjs-base-model';

export default class SaleModel extends BaseModel {
  id = 0;
  idLocal = 0;
  dateOfSale = '';

  constructor(data = {}) {
    super();
    if (!Object.keys(data).length) {
      this.id = null;
    }
    this.update(data);
  }
}
