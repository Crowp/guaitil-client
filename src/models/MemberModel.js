import { BaseModel } from 'sjs-base-model';
import PersonModel from './PersonModel';
import LocalModel from './LocalModel';

export default class MemberModel extends BaseModel {
  memberId = 0;
  occupation = '';
  createdAt = '';
  person = PersonModel;
  locals = [LocalModel];
  memberType = '';
  constructor(data = {}) {
    super();
    if (!Object.keys(data).length) {
      this.memberId = null;
    }
    this.id = data.memberId;
    this.update(data);
  }
}
