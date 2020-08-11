import { BaseModel } from 'sjs-base-model';
import Local from './Local';

export default class Workshop extends BaseModel {
  local = Local;
  id = 0;

  constructor(data) {
    super();
    this.update(data);
  }
}
