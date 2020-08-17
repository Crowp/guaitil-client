import { BaseModel } from 'sjs-base-model';
import UserModel from './UserModel';

export default class ActivityHistoryModel extends BaseModel {
  id = 0;
  action = '';
  auditDate = '';
  user = UserModel;
  constructor(data) {
    super();
    this.update(data);
  }
}
