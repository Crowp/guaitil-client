import { BaseModel } from 'sjs-base-model';
import UserModel from './UserModel';

export default class ActivityHistoryModel extends BaseModel {
  id = 0;
  action = '';
  auditDate = '';
  user = UserModel;

  constructor(data = {}) {
    super();
    if (!Object.keys(data).length) {
      this.id = null;
    }
    this.update(data);
  }
}
