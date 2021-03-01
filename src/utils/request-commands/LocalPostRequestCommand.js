import environment from 'environment';
import { RequestCommand } from './RequestCommand';

import LocalModel from '../../models/LocalModel';
import * as EffectUtility from '../../utils/EffectUtility';
import { requestDeleteLocal } from '../../stores/local/LocalEffect';

export class LocalPostRequestCommand extends RequestCommand {
  constructor(local) {
    super();
    this.local = local;
  }
  executeRequest = async () => {
    const endpoint = environment.api.locals.replace(':id', '');
    this.response = await EffectUtility.postToModel(LocalModel, endpoint, this.local);
    this.ifResponseIsNotValidThrowsError();
    return this.response;
  };

  addMultimediaBeforeRequest = files => {
    this.local.multimedia = [...files];
  };

  rollback = async () => {
    if (this.isExecuted) {
      const id = this.response?.id;
      return await requestDeleteLocal(id);
    }
  };
}
