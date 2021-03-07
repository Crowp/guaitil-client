import environment from 'environment';
import { RequestCommand } from '../../../../utils/requests/commands/RequestCommand';

import LocalModel from '../../../../models/LocalModel';
import * as EffectUtility from '../../../../utils/EffectUtility';

export class LocalsRequestCommand extends RequestCommand {
  constructor(query = '') {
    super();
    this.query = query;
  }
  executeRequest = async () => {
    const endpoint = environment.api.locals.replace(':id', this.query);
    return await EffectUtility.getToModel(LocalModel, endpoint);
  };
}

export const createLocalsRequestCommand = query => {
  return new LocalsRequestCommand(query);
};
