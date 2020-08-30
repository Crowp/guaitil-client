import environment from 'environment';
import * as EffectUtility from '../../utils/EffectUtility';
import HttpResponseModel from '../../models/HttpErrorResponseModel';
import ActivityModel from '../../models/ActivityModel';

export const requestActivities = async () => {
  const endpoint = environment.api.activities.replace(':id', '');
  return await EffectUtility.getToModel(ActivityModel, endpoint);
};
export const requestUpdateActivity = async activity => {
  const endpoint = environment.api.activities.replace(':id', activity.id);
  return await EffectUtility.putToModel(ActivityModel, endpoint, activity);
};
export const requestDeleteActivity = async id => {
  const endpoint = environment.api.activities.replace(':id', id);
  const response = await EffectUtility.deleteToModel(ActivityModel, endpoint);
  return response instanceof HttpResponseModel ? response : id;
};

export const requestCreateActivity = async Activity => {
  const endpoint = environment.api.activities.replace(':id', '');
  return await EffectUtility.postToModel(ActivityModel, endpoint, Activity);
};
