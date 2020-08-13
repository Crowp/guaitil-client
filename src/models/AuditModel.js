import { BaseModel } from 'sjs-base-model';
import UserModel from './UserModel';

export default class AuditModel extends BaseModel {
  id = 0;
  action = '';
  auditDate = '';
  idUserRole = 0;
  user = UserModel;
  constructor(data) {
    super();
    this.update(data);
  }
}
