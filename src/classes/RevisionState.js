import { BaseModel } from 'sjs-base-model';
import Local from './Local';

export default class RevisionState extends BaseModel {
  id = 0;
  name = '';

  constructor(data) {
    super();
    this.update(data);
  }
}
