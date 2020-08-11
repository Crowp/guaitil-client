import { BaseModel } from 'sjs-base-model';

export default class PersonModel extends BaseModel {
  personId = 0;
  name = '';
  lastnameOne = '';
  lastnametwo = '';
  telephone = '';
  email = '';
  idtypePerson = 0;
  constructor(data) {
    super();
    this.update(data);
  }
}
