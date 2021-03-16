import environment from 'environment';
import { RequestCommand } from '../../../../utils/requests/commands/RequestCommand';

import * as EffectUtility from '../../../../utils/EffectUtility';
import ActivityModel from '../../../../models/ActivityModel';

export class ActivitiesRequestCommand extends RequestCommand {
  constructor(query = '') {
    super();
    this.query = query;
  }
  executeRequest = async () => {
    const endpoint = environment.api.activities.replace(':id', this.query);
    return await EffectUtility.getToModel(ActivityModel, endpoint);
  };
}

export const createActivitiesRequestCommand = query => {
  return new ActivitiesRequestCommand(query);
};
