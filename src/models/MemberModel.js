import { BaseModel } from 'sjs-base-model';
import PersonModel from './PersonModel';
import LocalModel from './LocalModel';

export default class AssociatedModel extends BaseModel {
  id = 0;
  occupation = '';
  createdAt = '';
  person = PersonModel;
  locals = [LocalModel];
  memberType = '';
  constructor(data) {
    super();
    this.update(data);
  }
}
