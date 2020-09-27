import environment from 'environment';
import * as EffectUtility from '../../utils/EffectUtility';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as MultimediaEffect from '../multimedia/MultimediaEffect';
import * as UserEffect from '../user/UserEffect';
import LocalModel from '../../models/LocalModel';
import { isIterableArray } from '../../template/helpers/utils';

export const requestLocals = async () => {
  const endpoint = environment.api.locals.replace(':id', '');
  return await EffectUtility.getToModel(LocalModel, endpoint);
};

export const requestLocalsByLodging = async () => {
  const endpoint = environment.api.locals.replace(':id', 'hospedajes', '');
  return await EffectUtility.getToModel(LocalModel, endpoint);
};

export const requestLocalsByWorkshop = async () => {
  const endpoint = environment.api.locals.replace(':id', 'talleres', '');
  return await EffectUtility.getToModel(LocalModel, endpoint);
};

export const requestLocalsByKitchen = async () => {
  const endpoint = environment.api.locals.replace(':id', 'cocinas', '');
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

  const responseLocal = await EffectUtility.putToModel(LocalModel, endpoint, local);
  if (responseLocal instanceof HttpErrorResponseModel) {
    if (isIterableArray(responseMultimediaList)) {
      await MultimediaEffect.requestDeleteMultimediaList(responseMultimediaList);
    }
    return responseLocal;
  }

  if (user?.password) {
    const responseUser = await UserEffect.resetPassword(user.id, user.password);
    if (responseUser instanceof HttpErrorResponseModel) {
      return responseUser;
    }
  }
  return responseLocal;
};

export const requestCreateLocal = async local => {
  const endpoint = environment.api.locals.replace(':id', '');
  let responseMultimediaList = await MultimediaEffect.requestCreateMultimediaList(local.multimedia, 'local_', '_image');
  if (responseMultimediaList instanceof HttpErrorResponseModel) {
    return responseMultimediaList;
  }
  local.multimedia = [...responseMultimediaList];
  const response = await EffectUtility.postToModel(LocalModel, endpoint, local);
  if (response instanceof HttpErrorResponseModel) {
    if (isIterableArray(responseMultimediaList)) {
      await MultimediaEffect.requestDeleteMultimediaList(responseMultimediaList);
    }
  }
  return response;
};

export const requestCreateLocalWithUser = async (local, user) => {
  const endpoint = environment.api.locals.replace(':id', '');
  let responseMultimediaList = await MultimediaEffect.requestCreateMultimediaList(local.multimedia, 'local_', '_image');
  if (responseMultimediaList instanceof HttpErrorResponseModel) {
    return responseMultimediaList;
  }
  local.multimedia = [...responseMultimediaList];

  const responseLocal = await EffectUtility.postToModel(LocalModel, endpoint, local);
  if (responseLocal instanceof HttpErrorResponseModel) {
    if (isIterableArray(responseMultimediaList)) {
      await MultimediaEffect.requestDeleteMultimediaList(responseMultimediaList);
    }
    return responseLocal;
  }

  const newUser = {
    ...user,
    member: local.member
  };

  const responseUser = await UserEffect.requestCreateUser(newUser);

  if (responseUser instanceof HttpErrorResponseModel) {
    if (responseLocal?.id) {
      await requestDeleteLocal(responseLocal.id);
    }
    return responseUser;
  }
  return responseLocal;
};

export const requestLocalById = async id => {
  const endpoint = environment.api.locals.replace(':id', id);
  return await EffectUtility.getToModel(LocalModel, endpoint);
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
