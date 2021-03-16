import environment from 'environment';
import { RequestCommand } from '../../../../utils/requests/commands/RequestCommand';

import ActivityModel from '../../../../models/ActivityModel';
import * as EffectUtility from '../../../../utils/EffectUtility';

export class ActivityPutRequestCommand extends RequestCommand {
  constructor(activity) {
    super();
    this.activity = activity;
  }
  executeRequest = async () => {
    const endpoint = environment.api.activities.replace(':id', this.activity.id);
    const response = await EffectUtility.putToModel(ActivityModel, endpoint, this.activity);
    this.ifResponseIsNotValidThrowsError(response);
    return response;
  };

  addMultimediaBeforeRequest = files => {
    if (files.length) {
      this.activity.multimedia = [...files, ...this.activity.multimedia];
    }
  };
}

export const createActivityPutRequestCommand = activity => {
  return new ActivityPutRequestCommand(activity);
};
