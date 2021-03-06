import environment from 'environment';
import { RequestCommand } from '../../../../utils/requests/commands/RequestCommand';

import ActivityModel from '../../../../models/ActivityModel';
import * as EffectUtility from '../../../../utils/EffectUtility';

export class ActivityPutRequestCommand extends RequestCommand {
  constructor(local) {
    super();
    this.local = local;
  }
  executeRequest = async () => {
    const endpoint = environment.api.activities.replace(':id', this.local.id);
    const response = await EffectUtility.putToModel(ActivityModel, endpoint, this.local);
    this.ifResponseIsNotValidThrowsError(response);
    return response;
  };

  addMultimediaBeforeRequest = files => {
    this.activity.multimedia = [...files, ...this.activity.multimedia];
  };
}

export const createActivityPutRequestCommand = local => {
  return new ActivityPutRequestCommand(local);
};
