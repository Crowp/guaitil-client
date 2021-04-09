import { BaseModel } from 'sjs-base-model';
import MemberModel from './MemberModel';
import ActivityHistoryModel from './ActivityHistoryModel';

export default class UserModel extends BaseModel {
  id = 0;
  firstLogin = true;
  resetPassword = false;
  roles = [''];
  token = '';
  activityHistories = [ActivityHistoryModel];
  member = MemberModel;

  constructor(data = {}) {
    super();
    if (!Object.keys(data).length) {
      this.id = null;
    }
    this.update(data);
  }
}
