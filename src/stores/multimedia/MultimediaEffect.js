import { createFileDeleteByIdRequest } from './requests/FileDeleteByIdRequest';
import { createFilePostRequest } from './requests/FilePostRequest';
import { createFileListPostRequest } from './requests/FileListPostRequest';

export const requestCreateMultimedia = async (multimedia, prefix, suffix) => {
  return await createFilePostRequest(multimedia, prefix, suffix).getResponse();
};

export const requestCreateMultimediaList = async (multimediaList, prefix, suffix) => {
  return await createFileListPostRequest(multimediaList, prefix, suffix).getResponse();
};

export const requestDeleteMultimediaList = async (multimediaList = []) => {
  multimediaList.forEach(async media => {
    await requestDeleteMultimedia(media.id);
  });
};

export const requestDeleteMultimedia = async id => {
  return await createFileDeleteByIdRequest(id).getResponse();
};
