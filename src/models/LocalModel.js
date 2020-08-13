import { BaseModel } from 'sjs-base-model';
import MultimediaModel from './MultimediaModel';
import AddressModel from './AddressModel';
import PersonModel from './PersonModel';

export default class LocalModel extends BaseModel {
  id = 0;
  name = 0;
  description = '';
  telephone = '';
  localType = '';
  address = AddressModel;
  person = PersonModel;
  multimedia = [MultimediaModel];

  constructor(data) {
    super();
    this.update(data);
  }
}
