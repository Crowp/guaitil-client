import { BaseModel } from 'sjs-base-model';
import MemberModel from './MemberModel';
import ActivityHistoryModel from './ActivityHistoryModel';

export default class UserModel extends BaseModel {
  id = 0;
  password = '';
  firstLogin = true;
  role = [''];
  activityHistories = [ActivityHistoryModel];
  member = MemberModel;

  constructor(data) {
    super();
    this.update(data);
  }
}
