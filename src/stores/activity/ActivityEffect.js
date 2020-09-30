import environment from 'environment';
import * as EffectUtility from '../../utils/EffectUtility';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as MultimediaEffect from '../multimedia/MultimediaEffect';
import * as TourEffect from '../tour/TourEffect';
import ActivityModel from '../../models/ActivityModel';

export const requestActivities = async () => {
  const endpoint = environment.api.activities.replace(':id', 'actividades', '');
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

export const requestUpdateActivityWithTour = async (activity, tour) => {
  const responseActivity = await requestUpdateActivity(activity);
  if (responseActivity instanceof HttpErrorResponseModel) {
    return responseActivity;
  }
  const newtour = {
    ...tour,
    activity: responseActivity
  };
  const responseTour = tour.id
    ? await TourEffect.requestUpdateTour(newtour)
    : await TourEffect.requestCreateTour(newtour);
  if (responseTour instanceof HttpErrorResponseModel) {
    return responseTour;
  }
  return responseActivity;
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
  const endpoint = environment.api.activities.replace(':id', '');
  let multimedias = [];
  for (let media of activity.multimedia) {
    const response = await MultimediaEffect.requestCreateMultimedia(media, 'activity_', '_image');
    if (response instanceof HttpErrorResponseModel) {
      return response;
    }
    multimedias = [...multimedias, response];
  }
  activity.multimedia = [...multimedias];
  return await EffectUtility.postToModel(ActivityModel, endpoint, activity);
};

export const requestCreateActivityWithTour = async (activity, tour) => {
  const responseActivity = await requestCreateActivity(activity);
  if (responseActivity instanceof HttpErrorResponseModel) {
    return responseActivity;
  }
  const newtour = {
    ...tour,
    activity: responseActivity
  };
  const responseTour = await TourEffect.requestCreateTour(newtour);
  if (responseTour instanceof HttpErrorResponseModel) {
    return responseTour;
  }
  return responseActivity;
};
