import { BaseModel } from 'sjs-base-model';
import PersonModel from './PersonModel';

export default class AssociatedModel extends BaseModel {
  id = 0;
  occupation = '';
  membershipDate = '';
  person = PersonModel;
  constructor(data) {
    super();
    this.update(data);
  }
}
