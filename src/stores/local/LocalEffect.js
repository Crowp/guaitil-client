import environment from 'environment';
import * as EffectUtility from '../../utils/EffectUtility';
import HttpResponseModel from '../../models/HttpErrorResponseModel';
import * as MultimediaEffect from '../multimedia/MultimediaEffect';
import LocalModel from '../../models/LocalModel';

export const requestLocals = async () => {
  const endpoint = environment.api.locals.replace(':id', '');
  return await EffectUtility.getToModel(LocalModel, endpoint);
};

export const requestUpdateLocal = async local => {
  const endpoint = environment.api.locals.replace(':id', local.id);
  return await EffectUtility.putToModel(LocalModel, endpoint, local);
};

export const requestCreateLocal = async local => {
  const endpoint = environment.api.locals.replace(':id', '');
  let multimedias = [];
  for (let index = 0; index < local.multimedia.length; index++) {
    const media = local.multimedia[index];
    const response = await MultimediaEffect.requestCreateMultimedia(media, 'local_', '_image');
    if (response instanceof HttpResponseModel) {
      return response;
    }
    multimedias = [...multimedias, response];
  }
  local.multimedia = [...multimedias];
  return await EffectUtility.postToModel(LocalModel, endpoint, local);
};

export const requestLocalById = async id => {
  const endpoint = environment.api.locals.replace(':id', id);
  return await EffectUtility.getToModel(LocalModel, endpoint);
};

export const requestDeleteLocal = async id => {
  const endpoint = environment.api.locals.replace(':id', id);
  const response = await EffectUtility.deleteToModel(LocalModel, endpoint);
  return response instanceof HttpResponseModel ? response : id;
};
