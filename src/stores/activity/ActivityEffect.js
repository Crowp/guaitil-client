import environment from 'environment';
import * as EffectUtility from '../../utils/EffectUtility';
import HttpResponseModel from '../../models/HttpErrorResponseModel';
import * as MultimediaEffect from '../multimedia/MultimediaEffect';
import * as TourEffect from '../tour/TourEffect';
import ActivityModel from '../../models/ActivityModel';

export const requestActivities = async () => {
  const endpoint = environment.api.activities.replace(':id', '');
  return await EffectUtility.getToModel(ActivityModel, endpoint);
};

export const requestActivityById = async id => {
  const endpoint = environment.api.activities.replace(':id', id);
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

export const requestDeleteActivityMultimediaById = async (id, idMultimedia) => {
  const endpoint = environment.api.activities.replace(
    ':id',
    `deleteMultimediaById?id=${id}&idMultimedia=${idMultimedia}`
  );
  const response = await EffectUtility.deleteToModel(ActivityModel, endpoint);
  return response instanceof HttpResponseModel ? response : response;
};

export const requestCreateActivity = async activity => {
  const endpoint = environment.api.activities.replace(':id', '');
  let multimedias = [];
  for (let index = 0; index < activity.multimedia.length; index++) {
    const media = activity.multimedia[index];
    const response = await MultimediaEffect.requestCreateMultimedia(media, 'activity_', '_image');
    if (response instanceof HttpResponseModel) {
      return response;
    }
    multimedias = [...multimedias, response];
  }
  activity.multimedia = [...multimedias];
  return await EffectUtility.postToModel(ActivityModel, endpoint, activity);
};

export const requestCreateActivityWithTour = async (activity, tour) => {
  const responseActivity = await requestCreateActivity(activity);
  if (responseActivity instanceof HttpResponseModel) {
    return responseActivity;
  }
  console.log({ responseActivity });
  tour.activity = responseActivity;
  const responseTour = await TourEffect.requestCreateTour(tour);
  if (!(responseTour instanceof HttpResponseModel)) {
    return responseActivity;
  }
};
