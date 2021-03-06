import environment from 'environment';
import { RequestCommand } from '../../../../utils/requests/commands/RequestCommand';

import LocalModel from '../../../../models/LocalModel';
import * as EffectUtility from '../../../../utils/EffectUtility';

export class ActivitiesRequestCommand extends RequestCommand {
  constructor(query = '') {
    super();
    this.query = query;
  }
  executeRequest = async () => {
    const endpoint = environment.api.activities.replace(':id', this.query);
    return await EffectUtility.getToModel(LocalModel, endpoint, this.local);
  };
}

export const createActivitiesRequestCommand = query => {
  return new ActivitiesRequestCommand(query);
};
