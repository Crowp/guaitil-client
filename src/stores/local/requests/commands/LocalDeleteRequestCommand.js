import environment from 'environment';
import { RequestCommand } from '../../../../utils/requests/commands/RequestCommand';

import LocalModel from '../../../../models/LocalModel';
import * as EffectUtility from '../../../../utils/EffectUtility';

export class LocalDeleteRequestCommand extends RequestCommand {
  constructor(query) {
    super();
    this.query = query;
  }
  executeRequest = async () => {
    const endpoint = environment.api.locals.replace(':id', this.query);
    return await EffectUtility.deleteToModel(LocalModel, endpoint);
  };
}

export const createLocalDeleteRequestCommand = query => {
  return new LocalDeleteRequestCommand(query);
};
