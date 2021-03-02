import environment from 'environment';
import { RequestCommand } from '../../../../utils/requests/commands/RequestCommand';

import LocalModel from '../../../../models/LocalModel';
import * as EffectUtility from '../../../../utils/EffectUtility';

export class LocalPutRequestCommand extends RequestCommand {
  constructor(local) {
    super();
    this.local = local;
  }
  executeRequest = async () => {
    const endpoint = environment.api.locals.replace(':id', this.local.id);
    this.response = await EffectUtility.putToModel(LocalModel, endpoint, this.local);
    this.ifResponseIsNotValidThrowsError();
    return this.response;
  };

  addMultimediaBeforeRequest = files => {
    this.local.multimedia = [...files, ...this.local.multimedia];
  };
}

export const createLocalPutRequestCommand = local => {
  return new LocalPutRequestCommand(local);
};
