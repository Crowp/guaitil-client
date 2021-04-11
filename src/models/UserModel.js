import { BaseModel } from 'sjs-base-model';
import MemberModel from './MemberModel';
import ActivityHistoryModel from './ActivityHistoryModel';

export default class UserModel extends BaseModel {
  id = 0;
  roles = [''];
  token = '';
  activityHistories = [ActivityHistoryModel];
  member = MemberModel;
  firstLogin = false;
  resetPassword = false;

  constructor(data = {}) {
    super();
    if (!Object.keys(data).length) {
      this.id = null;
    }
    this.update(data);
  }
}
