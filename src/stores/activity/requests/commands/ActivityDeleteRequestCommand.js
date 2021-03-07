import environment from 'environment';
import { RequestCommand } from '../../../../utils/requests/commands/RequestCommand';

import ActivityModel from '../../../../models/ActivityModel';
import * as EffectUtility from '../../../../utils/EffectUtility';

export class ActivityDeleteRequestCommand extends RequestCommand {
  constructor(query) {
    super();
    this.query = query;
  }
  executeRequest = async () => {
    const endpoint = environment.api.activities.replace(':id', this.query);
    return await EffectUtility.deleteToModel(ActivityModel, endpoint);
  };
}

export const createActivityDeleteRequestCommand = query => {
  return new ActivityDeleteRequestCommand(query);
};
