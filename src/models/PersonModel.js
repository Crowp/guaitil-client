import { BaseModel } from 'sjs-base-model';
import TypePerson from './TypePerson';

export default class PersonModel extends BaseModel {
  id = 0;
  name = '';
  firstLastName = '';
  secondLastName = '';
  telephone = '';
  email = '';
  personType = '';
  constructor(data) {
    super();
    this.update(data);
  }
}
