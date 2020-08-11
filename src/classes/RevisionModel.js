import { BaseModel } from 'sjs-base-model';
import ProductModel from './ProductModel';

export default class RevisionModel extends BaseModel {
  id = 0;
  dateOfRevision = '';
  product = ProductModel;
  idRevisionState = 0;
  comment = '';

  constructor(data) {
    super();
    this.update(data);
  }
}
