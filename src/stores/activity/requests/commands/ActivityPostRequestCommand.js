import environment from 'environment';
import * as EffectUtility from '../../../../utils/EffectUtility';
import { RollbackRequestCommand } from '../../../../utils/requests/commands/RollbackRequestCommand';
import { createActivityDeleteRequestCommand } from './ActivityDeleteRequestCommand';
import ActivityModel from '../../../../models/ActivityModel';

export class ActivityPostRequestCommand extends RollbackRequestCommand {
  constructor(activity) {
    super();
    this.activity = activity;
  }
  executeRequest = async () => {
    const endpoint = environment.api.activity.replace(':id', '');
    const response = await EffectUtility.postToModel(ActivityModel, endpoint, this.activity);
    this.ifResponseIsNotValidThrowsError(response);
    this.id = response.id;
    return response;
  };

  addMultimediaBeforeRequest = files => {
    this.activity.multimedia = [...files];
  };

  rollback = async () => {
    if (this.isExecuted) {
      const id = this.id;
      return await createActivityDeleteRequestCommand(id).executeRequest();
    }
  };
}

export const createActivityPostRequestCommand = activity => {
  return new ActivityPostRequestCommand(activity);
};
