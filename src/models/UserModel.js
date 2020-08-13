import { BaseModel } from 'sjs-base-model';
import PersonModel from './PersonModel';

export default class UserModel extends BaseModel {
  id = 0;
  password = '';
  firstLogin = true;
  role = '';
  person = PersonModel;

  constructor(data) {
    super();
    this.update(data);
  }
}
