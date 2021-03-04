import environment from 'environment';
import * as EffectUtility from '../../../../utils/EffectUtility';
import { RequestCommand } from '../../../../utils/requests/commands/RequestCommand';

import ActivityModel from '../../../../models/ActivityModel';

export class ActivityPostRequestCommand extends RequestCommand {
  constructor(activity) {
    super();
    this.activity = activity;
  }
  executeRequest = async () => {
    const endpoint = environment.api.activity.replace(':id', '');
    this.response = await EffectUtility.postToModel(ActivityModel, endpoint, this.activity);
    this.ifResponseIsNotValidThrowsError();
    return this.response;
  };

  addMultimediaBeforeRequest = files => {
    this.activity.multimedia = [...files];
  };
}

export const createActivityPostRequestCommand = activity => {
  return new ActivityPostRequestCommand(activity);
};
