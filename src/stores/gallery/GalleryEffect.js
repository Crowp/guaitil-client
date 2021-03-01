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
  let response = await MultimediaEffect.requestCreateMultimediaList(multimedia, 'gallery_', '_image');
  if (response instanceof HttpErrorResponseModel) {
    return response;
  }
  return await EffectUtility.postToModel(GalleryModel, endpoint, { multimedia: response });
};
