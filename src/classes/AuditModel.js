import { BaseModel } from 'sjs-base-model';

export default class AuditModel extends BaseModel {
  id = 0;
  name = '';
  action = '';
  date = '';
  idUserRole = 0;

  constructor(data) {
    super();
    this.update(data);
  }
}
