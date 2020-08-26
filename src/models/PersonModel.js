import { BaseModel } from 'sjs-base-model';

export default class PersonModel extends BaseModel {
  id = '';
  name = '';
  firstLastName = '';
  secondLastName = '';
  telephone = '';
  email = '';
  personType = 'ROLE_MEMBER';
  gender = '';
  constructor(data) {
    super();
    this.update(data);
  }
}
