import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import { createGalleryFilesPostRequest } from './requests/GalleryFilesPostRequest';
import { createGalleryDeleteFilesByIdRequest } from './requests/GalleryDeleteFilesByIdRequest';
import { createGalleryImagesRequest } from './requests/GalleryImagesRequest';

export const requestGalery = async () => {
  const endpoint = environment.api.gallery;
  return await createGalleryImagesRequest().getResponse();
};

export const requestDeleteGaleryMultimedia = async id => {
  const response = createGalleryDeleteFilesByIdRequest(id).getResponse();
  return response instanceof HttpErrorResponseModel ? response : id;
};

export const requestAddMultimedia = async multimedia => {
  return await createGalleryFilesPostRequest(multimedia).getResponse();
};
