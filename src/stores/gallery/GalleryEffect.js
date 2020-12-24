import environment from 'environment';
import * as EffectUtility from '../../utils/EffectUtility';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import GalleryModel from '../../models/GalleryModel';
import * as MultimediaEffect from '../multimedia/MultimediaEffect';

export const requestGalery = async () => {
  const endpoint = environment.api.gallery;
  return await EffectUtility.getToModel(GalleryModel, endpoint);
};

export const requestDeleteGaleryMultimedia = async id => {
  const endpoint = environment.api.gallery + '/' + id;
  const response = await EffectUtility.deleteToModel(GalleryModel, endpoint);
  return response instanceof HttpErrorResponseModel ? response : id;
};

export const requestAddMultimedia = async multimedia => {
  const endpoint = environment.api.gallery;
  let multimedias = [];
  for (let index = 0; index < multimedia.length; index++) {
    const media = multimedia[index];
    const response = await MultimediaEffect.requestCreateMultimedia(media, 'galery_', '_image');
    if (response instanceof HttpErrorResponseModel) {
      return response;
    }
    multimedias = [...multimedias, response];
  }
  return await EffectUtility.postToModel(GalleryModel, endpoint, { multimedia: multimedias });
};
