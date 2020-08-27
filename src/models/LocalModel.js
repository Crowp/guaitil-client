import { BaseModel } from 'sjs-base-model';
import MultimediaModel from './MultimediaModel';
import AddressModel from './AddressModel';
import MemberModel from './MemberModel';

export default class LocalModel extends BaseModel {
  id = 0;
  name = 0;
  description = '';
  telephone = '';
  localType = '';
  address = AddressModel;
  member = MemberModel;
  multimedia = [MultimediaModel];

  constructor(data = {}) {
    super();
    this.update(data);
  }
}
