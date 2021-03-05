import environment from 'environment';
import { RollbackRequestCommand } from '../../../../utils/requests/commands/RollbackRequestCommand';

import LocalModel from '../../../../models/LocalModel';
import * as EffectUtility from '../../../../utils/EffectUtility';
import { createLocalDeleteRequestCommand } from './LocalDeleteRequestCommand';

export class LocalPostRequestCommand extends RollbackRequestCommand {
  constructor(local) {
    super();
    this.local = local;
  }
  executeRequest = async () => {
    const endpoint = environment.api.locals.replace(':id', '');
    const response = await EffectUtility.postToModel(LocalModel, endpoint, this.local);
    console.log(response);
    this.ifResponseIsNotValidThrowsError(response);
    return response;
  };

  addMultimediaBeforeRequest = (files = []) => {
    this.local.multimedia = [...files];
  };

  rollback = async () => {
    if (this.isExecuted) {
      const id = this.response?.id;
      return await createLocalDeleteRequestCommand(id).executeRequest();
    }
  };
}

export const createLocalPostRequestCommand = local => {
  return new LocalPostRequestCommand(local);
};
