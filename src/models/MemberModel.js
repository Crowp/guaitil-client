import { BaseModel } from 'sjs-base-model';
import PersonModel from './PersonModel';
import LocalModel from './LocalModel';

export default class MemberModel extends BaseModel {
  id = 0;
  occupation = '';
  affiliationDate = '';
  createdAt = '';
  updatedAt = '';
  person = PersonModel;
  locals = [LocalModel];
  memberType = '';
  constructor(data = {}) {
    super();
    if (!Object.keys(data).length) {
      this.memberId = null;
    }
    this.update(data);
  }
}
