import environment from 'environment';
import * as EffectUtility from '../../utils/EffectUtility';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as MultimediaEffect from '../multimedia/MultimediaEffect';
import ActivityModel from '../../models/ActivityModel';
import { createActivityFilesPostRequest } from './requests/ActivityFilesPostRequest';

export const requestActivities = async () => {
  const endpoint = environment.api.activities.replace(':id', '');
  return await EffectUtility.getToModel(ActivityModel, endpoint);
};

export const requestActivityById = async id => {
  const endpoint = environment.api.activities.replace(':id', id);
  return await EffectUtility.getToModel(ActivityModel, endpoint);
};

export const requestUpdateActivity = async ({ newMultimedia = [], ...activity }) => {
  const endpoint = environment.api.activities.replace(':id', activity.id);
  let responseMultimediaList = await MultimediaEffect.requestCreateMultimediaList(newMultimedia, 'activity_', '_image');
  if (responseMultimediaList instanceof HttpErrorResponseModel) {
    return responseMultimediaList;
  }
  activity.multimedia = [...responseMultimediaList, ...activity.multimedia];
  return await EffectUtility.putToModel(ActivityModel, endpoint, activity);
};

export const requestDeleteActivity = async id => {
  const endpoint = environment.api.activities.replace(':id', id);
  const response = await EffectUtility.deleteToModel(ActivityModel, endpoint);
  return response instanceof HttpErrorResponseModel ? response : id;
};

export const requestDeleteActivityMultimediaById = async (id, idMultimedia) => {
  const endpoint = environment.api.activities.replace(
    ':id',
    `delete-multimedia-by-id?id=${id}&idMultimedia=${idMultimedia}`
  );
  const response = await EffectUtility.deleteToModel(ActivityModel, endpoint);
  return response instanceof HttpErrorResponseModel ? response : response;
};

export const requestCreateActivity = async activity => {
  return await createActivityFilesPostRequest(activity).getResponse();
};
