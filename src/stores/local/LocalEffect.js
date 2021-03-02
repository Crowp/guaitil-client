import environment from 'environment';
import * as EffectUtility from '../../utils/EffectUtility';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as MultimediaEffect from '../multimedia/MultimediaEffect';
import * as UserEffect from '../user/UserEffect';
import LocalModel from '../../models/LocalModel';
import { isIterableArray } from '../../template/helpers/utils';
import { createLocalFilesPostRequest } from '../../utils/requests/LocalFilesPostRequest';
import { createLocalUserPostRequest } from '../../utils/requests/LocalUserPostRequest';

export const requestLocals = async () => {
  const endpoint = environment.api.locals.replace(':id', '');
  return await EffectUtility.getToModel(LocalModel, endpoint);
};

export const requestLocalsByLocalType = async type => {
  const endpoint = environment.api.locals.replace(':id', `local-types/${type}`);
  return await EffectUtility.getToModel(LocalModel, endpoint);
};

export const requestLocalById = async id => {
  const endpoint = environment.api.locals.replace(':id', id);
  return await EffectUtility.getToModel(LocalModel, endpoint);
};

export const requestLocalsByMemberId = async id => {
  const endpoint = environment.api.locals.replace(':id', 'member-id/' + id);
  return await EffectUtility.getToModel(LocalModel, endpoint);
};

export const requestUpdateLocal = async ({ newMultimedia = [], ...local }, user) => {
  const endpoint = environment.api.locals.replace(':id', local.id);
  let responseMultimediaList = await MultimediaEffect.requestCreateMultimediaList(newMultimedia, 'local_', '_image');
  if (responseMultimediaList instanceof HttpErrorResponseModel) {
    return responseMultimediaList;
  }
  local.multimedia = [...responseMultimediaList, ...local.multimedia];

  const localPostRequest = await EffectUtility.putToModel(LocalModel, endpoint, local);
  if (localPostRequest instanceof HttpErrorResponseModel) {
    if (isIterableArray(responseMultimediaList)) {
      await MultimediaEffect.requestDeleteMultimediaList(responseMultimediaList);
    }
    return localPostRequest;
  }

  if (user?.password) {
    const responseUser = await UserEffect.resetPassword(user.id, user.password);
    if (responseUser instanceof HttpErrorResponseModel) {
      return responseUser;
    }
  }
  return localPostRequest;
};

export const requestCreateLocal = async local => {
  return createLocalFilesPostRequest(local).getResponse();
};

export const requestCreateLocalWithUser = async (local, user) => {
  return createLocalUserPostRequest(local, user).getResponse();
};

export const requestDeleteLocal = async id => {
  const endpoint = environment.api.locals.replace(':id', id);
  const response = await EffectUtility.deleteToModel(LocalModel, endpoint);
  return response instanceof HttpErrorResponseModel ? response : id;
};

export const requestDeleteLocalMultimediaById = async (id, idMultimedia) => {
  const endpoint = environment.api.locals.replace(
    ':id',
    `delete-multimedia-by-id?id=${id}&idMultimedia=${idMultimedia}`
  );
  const response = await EffectUtility.deleteToModel(LocalModel, endpoint);
  return response instanceof HttpErrorResponseModel ? response : response;
};
