import environment from 'environment';
import * as EffectUtility from '../../utils/EffectUtility';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as MultimediaEffect from '../multimedia/MultimediaEffect';
import * as UserEffect from '../user/UserEffect';
import LocalModel from '../../models/LocalModel';
import { isIterableArray } from '../../template/helpers/utils';
import { LocalPostRequestCommand } from '../../utils/request-commands/LocalPostRequestCommand';
import { FileListPostRequestCommand } from '../../utils/request-commands/FileListPostRequestCommand';
import { UserPostRequestCommand } from '../../utils/request-commands/UserPostRequestCommand';

export const localPostRequests = async () => {
  const endpoint = environment.api.locals.replace(':id', '');
  return await EffectUtility.getToModel(LocalModel, endpoint);
};

export const localPostRequestsByLocalType = async type => {
  const endpoint = environment.api.locals.replace(':id', `local-types/${type}`);
  return await EffectUtility.getToModel(LocalModel, endpoint);
};

export const localPostRequestsByMemberId = async id => {
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
  let localPostRequest = { rollbackAll: async () => {} };
  try {
    localPostRequest = await onLocalPostRequest(local);
    return localPostRequest.response;
  } catch (error) {
    await localPostRequest.rollback();
    return error.response;
  }
};

export const requestCreateLocalWithUser = async (local, user) => {
  const userPostRequestCommand = createUserPostCommand(user, local.member);
  let localPostRequest = { rollbackAll: async () => {} };
  try {
    localPostRequest = await onLocalPostRequest(local);
    await userPostRequestCommand.executeRequest();

    return localPostRequest;
  } catch (error) {
    await userPostRequestCommand.rollback();
    await localPostRequest.rollbackAll();
    return error.response;
  }
};

export const localPostRequestById = async id => {
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

export const onLocalPostRequest = async local => {
  const fileListPostCommand = createFileListPostCommand(local.multimedia);
  const localPostRequestCommand = createLocalPostCommand(local);

  const resposeFiles = await fileListPostCommand.executeRequest();

  localPostRequestCommand.addMultimediaBeforeRequest(resposeFiles);
  const responseLocal = await localPostRequestCommand.executeRequest();

  return {
    response: responseLocal,
    rollbackAll
  };

  async function rollbackAll() {
    await localPostRequestCommand.rollback();
    await fileListPostCommand.rollback();
  }
};

function createUserPostCommand(user, member = null) {
  return new UserPostRequestCommand(user, member);
}

function createLocalPostCommand(local) {
  return new LocalPostRequestCommand(local);
}

function createFileListPostCommand(files) {
  return new FileListPostRequestCommand(files, 'local_', '_image');
}
