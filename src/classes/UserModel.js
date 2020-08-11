import { BaseModel } from 'sjs-base-model';
import PersonModel from './PersonModel';
import UserRole from './UserRole';

export default class UserModel extends BaseModel {
  person = PersonModel;
  serId = userId;
  password = password;
  firstIncome = firstIncome;
  userRole = UserRole;

  constructor(data) {
    super();
    this.update(data);
  }
}
