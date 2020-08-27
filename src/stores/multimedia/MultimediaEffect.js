import environment from 'environment';
import * as EffectUtility from '../../utils/EffectUtility';
import MultimediaModel from '../../models/MultimediaModel';

export const requestCreateMultimedia = async (multimedia, prefix, suffix) => {
  const endpoint = environment.api.multimedia.replace(':id', 'upload');
  const file = createFile(multimedia);
  const formData = new FormData();
  formData.append('file', file);
  formData.append('prefix', prefix);
  formData.append('suffix', suffix);
  formData.append('type', multimedia.type === 'image/jpeg' ? 'IMAGE' : 'VIDEO');

  return await EffectUtility.postToModel(MultimediaModel, endpoint, formData);
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
