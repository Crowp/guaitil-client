import environment from 'environment';
import * as EffectUtility from '../../utils/EffectUtility';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import MultimediaModel from '../../models/MultimediaModel';
import { isIterableArray } from '../../template/helpers/utils';

export const requestCreateMultimedia = async (multimedia, prefix, suffix) => {
  const endpoint = environment.api.multimedia.replace(':id', 'upload');
  const formData = createFileFormData(multimedia, prefix, suffix);

  return await EffectUtility.postToModel(MultimediaModel, endpoint, formData);
};

export const requestCreateMultimediaList = async (multimediaList, prefix, suffix) => {
  let multimedias = [];

  for (let media of multimediaList) {
    const response = await requestCreateMultimedia(media, prefix, suffix);
    if (response instanceof HttpErrorResponseModel) {
      if (isIterableArray(multimedias)) {
        await requestDeleteMultimediaList(multimedias);
      }
      return response;
    }
    multimedias = [...multimedias, response];
  }
  return multimedias;
};

export const requestDeleteMultimediaList = async (multimediaList = []) => {
  multimediaList.forEach(async media => {
    if (media?.id) {
      await requestDeleteMultimedia(media.id);
    }
  });
};

export const requestDeleteMultimedia = async id => {
  const endpoint = environment.api.multimedia.replace(':id', id);

  const response = await EffectUtility.deleteToModel(MultimediaModel, endpoint);
  return response instanceof HttpErrorResponseModel ? response : id;
};

const createFile = multimedia => {
  let byteString = atob(multimedia.base64.split(',')[1]);
  let ab = new ArrayBuffer(byteString.length);
  let ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab], { type: multimedia.type });
  return new File([blob], multimedia.path, { type: multimedia.type });
};

const createFileFormData = (multimedia, prefix, suffix) => {
  const file = createFile(multimedia);
  const formData = new FormData();
  formData.append('file', file);
  formData.append('prefix', prefix);
  formData.append('suffix', suffix);
  formData.append('type', multimedia.type === 'image/jpeg' ? 'IMAGE' : 'VIDEO');
  return formData;
};
