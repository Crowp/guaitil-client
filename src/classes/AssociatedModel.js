import { BaseModel } from 'sjs-base-model';
import PersonModel from './PersonModel';

export default class AssociatedModel extends BaseModel {
  person = PersonModel;
  associatedId = 0;
  occupation = '';
  membershipDate = '';
  constructor(data) {
    super();
    this.update(data);
  }
}
