import environment from 'environment';
import * as EffectUtility from '../../utils/EffectUtility';
import HttpResponseModel from '../../models/HttpErrorResponseModel';
import TourModel from '../../models/TourModel';

export const requestTours = async () => {
  const endpoint = environment.api.tours.replace(':id', '');
  return await EffectUtility.getToModel(TourModel, endpoint);
};

export const requestUpdateTour = async local => {
  const endpoint = environment.api.tours.replace(':id', local.id);
  return await EffectUtility.putToModel(TourModel, endpoint, local);
};

export const requestCreateTour = async tour => {
  const endpoint = environment.api.tours.replace(':id', '');
  return await EffectUtility.postToModel(TourModel, endpoint, tour);
};

export const requestTourById = async id => {
  const endpoint = environment.api.tours.replace(':id', id);
  return await EffectUtility.getToModel(TourModel, endpoint);
};

export const requestDeleteTour = async id => {
  const endpoint = environment.api.tours.replace(':id', id);
  const response = await EffectUtility.deleteToModel(TourModel, endpoint);
  return response instanceof HttpResponseModel ? response : id;
};
